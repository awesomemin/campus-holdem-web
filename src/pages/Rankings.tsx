import { useEffect, useRef, useState } from 'react';
import Header from '../components/Header';
import RankingListItem from '../components/RankingListItem';
import { fetchRankings, type UserRankingDto } from '../api/user';

function Rankings() {
  const [rankings, setRankings] = useState<UserRankingDto[]>([]);
  const [myRanking, setMyRanking] = useState<UserRankingDto | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const observerTarget = useRef<HTMLDivElement>(null);
  const loadingRef = useRef(false);

  useEffect(() => {
    const loadRankings = async () => {
      // Prevent duplicate requests
      if (loadingRef.current || (!hasMore && page !== 1)) return;

      loadingRef.current = true;
      setLoading(true);
      try {
        const data = await fetchRankings(page);

        if (page === 1) {
          setRankings(data.rankings);
          if (data.myRanking) {
            setMyRanking(data.myRanking);
          }
        } else {
          setRankings((prev) => [...prev, ...data.rankings]);
        }

        // If we received fewer items than the limit, we've reached the end
        const reachedEnd = data.rankings.length < data.limit;
        setHasMore(!reachedEnd);

        // If viewport is large and observer target is visible, load next page
        if (!reachedEnd) {
          setTimeout(() => {
            if (observerTarget.current) {
              const rect = observerTarget.current.getBoundingClientRect();
              const isVisible = rect.top < window.innerHeight;
              if (isVisible && !loadingRef.current) {
                setPage((prev) => prev + 1);
              }
            }
          }, 100);
        }
      } catch (error) {
        console.error('Failed to load rankings:', error);
      } finally {
        setLoading(false);
        loadingRef.current = false;
      }
    };

    loadRankings();
  }, [page, hasMore]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 0.1 }
    );

    const currentTarget = observerTarget.current;

    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [hasMore, loading]);

  return (
    <>
      <Header />
      <div className="flex justify-center items-center font-semibold text-2xl h-[70px]">
        랭킹
      </div>
      <div className="mb-20">
        {myRanking && (
          <div className="fixed bottom-0 w-full max-w-md bg-bg-200 z-10 shadow-[0_-8px_4px_-1px_rgba(0,0,0,0.1)]">
            <RankingListItem
              ranking={myRanking.rank}
              profileImgUrl={myRanking.profilePictureUrl}
              nickname={myRanking.nickname}
              ppi={myRanking.ppi}
              userId={myRanking.userId}
              isOwner={true}
            />
          </div>
        )}

        {rankings.map((ranking) => (
          <RankingListItem
            key={ranking.userId}
            ranking={ranking.rank}
            profileImgUrl={ranking.profilePictureUrl}
            nickname={ranking.nickname}
            ppi={ranking.ppi}
            userId={ranking.userId}
            isOwner={myRanking?.userId === ranking.userId}
          />
        ))}

        {loading && (
          <div className="flex justify-center items-center h-[60px]">
            <span>로딩 중...</span>
          </div>
        )}
      </div>

      <div ref={observerTarget} className="h-4" />
    </>
  );
}

export default Rankings;

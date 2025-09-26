import { useState, useRef, useEffect } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Close from '@mui/icons-material/Close';
import AddAPhoto from '@mui/icons-material/AddAPhoto';
import Delete from '@mui/icons-material/Delete';
import DefaultProfileImgUrl from '../assets/defaultprofile.png';

interface EditProfileModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (formData: FormData) => void;
  onDeleteProfilePicture: () => void;
  currentData: {
    nickname: string;
    email: string | null;
    phoneNumber: string | null;
    profilePictureUrl: string | null;
  };
}

interface ValidationErrors {
  nickname: string;
  email: string;
  phoneNumber: string;
}

function EditProfileModal({
  open,
  onClose,
  onSave,
  onDeleteProfilePicture,
  currentData,
}: EditProfileModalProps) {
  const [nickname, setNickname] = useState(currentData.nickname);
  const [email, setEmail] = useState(currentData.email || '');
  const [phoneNumber, setPhoneNumber] = useState(currentData.phoneNumber || '');
  const [profilePictureFile, setProfilePictureFile] = useState<File | null>(
    null
  );
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isDeleted, setIsDeleted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [errors, setErrors] = useState<ValidationErrors>({
    nickname: '',
    email: '',
    phoneNumber: '',
  });

  // Validation logic similar to Signup component
  useEffect(() => {
    const newErrors: ValidationErrors = {
      nickname: '',
      email: '',
      phoneNumber: '',
    };

    // Nickname validation (2-10 characters, alphanumeric and Korean)
    const nicknameRegex = /^[a-zA-Z0-9가-힣]{2,10}$/;
    if (nickname === '') {
      newErrors.nickname = '닉네임을 입력해주세요.';
    } else if (!nicknameRegex.test(nickname)) {
      newErrors.nickname = '닉네임은 2~10자의 영문, 숫자, 한글만 가능합니다.';
    }

    // Email validation
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (email !== '' && !emailRegex.test(email)) {
      newErrors.email = '올바른 이메일 형식을 입력해주세요.';
    }

    // Phone number validation (optional, but if provided must be valid)
    const phoneNumberRegex = /^010[0-9]{8}$/;
    if (phoneNumber !== '' && !phoneNumberRegex.test(phoneNumber)) {
      newErrors.phoneNumber = '전화번호는 (-) 없이 숫자만 11자로 입력해주세요.';
    }

    setErrors(newErrors);
  }, [nickname, email, phoneNumber]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file size and type
      const maxSize = 5 * 1024 * 1024; // 5MB
      const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

      if (file.size > maxSize) {
        alert('파일 크기는 5MB 이하여야 합니다.');
        return;
      }

      if (!validTypes.includes(file.type)) {
        alert('JPG, PNG, GIF, WEBP 파일만 업로드 가능합니다.');
        return;
      }

      setProfilePictureFile(file);
      setIsDeleted(false); // Reset deleted state when new image is selected

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPreviewImage(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    // Check for validation errors
    if (Object.values(errors).some((error) => error !== '')) {
      return;
    }

    const formData = new FormData();

    // Only append fields that have changed
    if (nickname !== currentData.nickname) {
      formData.append('nickname', nickname);
    }
    if (email !== currentData.email) {
      formData.append('email', email || '');
    }
    if (phoneNumber !== currentData.phoneNumber) {
      formData.append('phoneNumber', phoneNumber || '');
    }
    if (profilePictureFile) {
      formData.append('profilePicture', profilePictureFile);
    }

    onSave(formData);
  };

  const handleDeleteProfilePicture = () => {
    setProfilePictureFile(null);
    setPreviewImage(null);
    setIsDeleted(true);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    // Call the delete API immediately
    onDeleteProfilePicture();
  };

  const handleCancel = () => {
    setNickname(currentData.nickname);
    setEmail(currentData.email || '');
    setPhoneNumber(currentData.phoneNumber || '');
    setProfilePictureFile(null);
    setPreviewImage(null);
    setIsDeleted(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleCancel}
      aria-labelledby="edit-profile-modal"
    >
      <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-bg-200 rounded-lg p-6 w-[90%] max-w-[404px]">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">프로필 편집</h2>
          <button
            onClick={handleCancel}
            className="text-text-gray hover:text-text-white"
          >
            <Close />
          </button>
        </div>

        <div className="flex flex-col items-center mb-6">
          <div className="relative">
            <img
              src={
                previewImage ||
                (isDeleted ? DefaultProfileImgUrl : currentData.profilePictureUrl) ||
                DefaultProfileImgUrl
              }
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover bg-text-white"
            />
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="absolute bottom-0 right-0 bg-bg-400 rounded-full p-1.5 hover:bg-bg-500 transition-colors"
              title="사진 변경"
            >
              <AddAPhoto className="w-5 h-5" />
            </button>
            {(currentData.profilePictureUrl || previewImage) && !isDeleted && (
              <button
                onClick={handleDeleteProfilePicture}
                className="absolute bottom-0 left-0 bg-red-500 rounded-full p-1.5 hover:bg-red-600 transition-colors"
                title="사진 삭제"
              >
                <Delete className="w-5 h-5 text-white" />
              </button>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">닉네임</label>
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              className={`w-full px-3 py-2 bg-bg-300 rounded-md focus:outline-none focus:ring-2 ${
                errors.nickname
                  ? 'border border-red-500 focus:ring-red-500'
                  : 'focus:ring-primary-green'
              }`}
              placeholder="닉네임을 입력하세요"
            />
            {errors.nickname && (
              <p className="text-red-500 text-xs mt-1">{errors.nickname}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">이메일</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full px-3 py-2 bg-bg-300 rounded-md focus:outline-none focus:ring-2 ${
                errors.email
                  ? 'border border-red-500 focus:ring-red-500'
                  : 'focus:ring-primary-green'
              }`}
              placeholder="이메일을 입력하세요"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">전화번호</label>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className={`w-full px-3 py-2 bg-bg-300 rounded-md focus:outline-none focus:ring-2 ${
                errors.phoneNumber
                  ? 'border border-red-500 focus:ring-red-500'
                  : 'focus:ring-primary-green'
              }`}
              placeholder="전화번호를 입력하세요 (예: 01012345678)"
            />
            {errors.phoneNumber && (
              <p className="text-red-500 text-xs mt-1">{errors.phoneNumber}</p>
            )}
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={handleCancel}
            className="flex-1 py-2 bg-bg-300 rounded-md hover:bg-bg-400 transition-colors"
          >
            취소
          </button>
          <button
            onClick={handleSave}
            disabled={Object.values(errors).some((error) => error !== '')}
            className={`flex-1 py-2 rounded-md transition-colors ${
              Object.values(errors).some((error) => error !== '')
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-primary-green text-text-black'
            }`}
          >
            저장
          </button>
        </div>
      </Box>
    </Modal>
  );
}

export default EditProfileModal;

interface ProfileSectionProps {
  profileImage?: string;
  nickname: string;
}

export function ProfileSection({
  profileImage,
  nickname,
}: ProfileSectionProps) {
  return (
    <div className="flex flex-col items-center mb-6 sm:mb-8">
      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden mb-2 sm:mb-4 shadow-lg">
        {profileImage ? (
          <img
            src={profileImage}
            alt="프로필"
            className="w-full h-full object-cover"
          />
        ) : (
          <div
            className="
          w-full h-full flex items-center justify-center
          bg-gradient-to-br from-blue-400 to-blue-600
          dark:from-blue-600 dark:to-blue-800
          transition-colors duration-300"
          >
            <span className="text-white text-xl sm:text-2xl font-bold">
              {nickname.charAt(0).toUpperCase()}
            </span>
          </div>
        )}
      </div>
      <h2 className="text-base sm:text-xl md:text-2xl font-semibold text-gray-800 dark:text-gray-100 transition-colors duration-300">
        {nickname}
      </h2>
    </div>
  );
}

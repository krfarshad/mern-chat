import Image from "next/image";
import profile from "../../assets/images/profile.jpg";

export const MyProfile = () => {
  return (
    <div className="mt-4 flex w-full flex-col items-center rounded-lg border border-gray-200 bg-indigo-100 px-4 py-6">
      <div className="h-20 w-20 overflow-hidden rounded-full border">
        <Image
          src={profile.src}
          alt="profile"
          priority={false}
          width={80}
          height={80}
          className="h-full w-full object-cover object-center"
        />
      </div>
      <div className="mt-2 text-sm font-semibold">Aminos Co.</div>
      <div className="text-xs text-gray-500">Be positive+</div>
    </div>
  );
};

import Image from "next/image";

interface Props {
  removeCallback?: (uuid: string) => void;
  removeLoading?: boolean;
  images: any;
}
const PreviewDefaultImages = (props: Props) => {
  const { images, removeCallback, removeLoading } = props;
  const removeItem = (uuid?: string) => {
    removeCallback && uuid && removeCallback(uuid);
  };

  return (
    <>
      {images && images.length > 0 && (
        <>
          {images.map((item: any) => (
            <div
              className="item relative h-24 w-24 object-cover"
              key={`preview_default_${item.uuid}`}
            >
              {item.thumb_url && (
                <button
                  disabled={removeLoading ? true : false}
                  type="button"
                  role="button"
                  onClick={() => removeItem(item.uuid)}
                  className="group absolute right-1 top-1 rounded-full bg-red-50 p-1 transition-all hover:bg-red-500 disabled:cursor-not-allowed"
                >
                  {removeLoading ? <p>loading</p> : <p>remove button</p>}
                </button>
              )}
              {item.thumb_url ? (
                <Image
                  src={item.thumb_url}
                  alt="item"
                  width={100}
                  height={100}
                  className="h-full w-full rounded-md object-cover object-center"
                />
              ) : (
                <span className="border-dark-gray rounded-2lg flex h-full w-full items-center justify-center border">
                  Uploading...
                </span>
              )}
            </div>
          ))}
        </>
      )}
    </>
  );
};

export default PreviewDefaultImages;

"use client";

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error(props: Props) {
  const { error, reset } = props;
  return <>Error</>;
}

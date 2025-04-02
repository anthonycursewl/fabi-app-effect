import TextWithColor from "@/app/shared/components/TextWithColor";

export const ListEmptyComponent = (): JSX.Element => {
  return (
    <TextWithColor style={{ fontSize: 13 }} color="rgba(128, 128, 128, 0.83)">
      No tienes citas
    </TextWithColor>
  );
};

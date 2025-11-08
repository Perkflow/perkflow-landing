import FooterSection from "@/features/(trip-website)/components/footer";
import Header from "@/features/(trip-website)/components/header";

type Props = {
  children: React.ReactNode;
};

export default async function Layout({ children }: Props) {
  return (
    <>
      <Header />
      {children}
      <FooterSection />
    </>
  );
}

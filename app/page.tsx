import DocCreator from "./components/DocCreator";
import c from "./page.module.scss";

export default function Home() {



  return (
    <main className={c.main}>
      <h1>Здесь будет кнопка</h1>
      <DocCreator />
    </main>
  );
}

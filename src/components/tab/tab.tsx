import Link from "next/link";

const styles = {
  tab: {
    marginTop: 100,
  },
};

export const Tab = (props: any) => {
  return (
    <ul className="nav nav-tabs my-5" style={styles.tab}>
      <li className="nav-item">
        <Link href="/home" legacyBehavior>
          <a
            className={props.current == "ms" ? "nav-link active" : "nav-link"}
            aria-current="page"
            href="#"
          >
            Mostrar Servi&ccedil;os
          </a>
        </Link>
      </li>

      <li className="nav-item">
        <Link href="/home/service" legacyBehavior>
          <a
            className={props.current == "ns" ? "nav-link active" : "nav-link"}
            aria-current="page"
            href="#"
          >
            Adicionar Novo Servi&ccedil;o
          </a>
        </Link>
      </li>

      <li className="nav-item">
        <Link href="/home/message" legacyBehavior>
          <a
            className={props.current == "ma" ? "nav-link active" : "nav-link"}
            aria-current="page"
            href="#"
          >
            Mensagem Automatica
          </a>
        </Link>
      </li>
    </ul>
  );
};

import "./App.css";
import { AutomergeUrl } from "@automerge/automerge-repo";
import { useDocument } from "@automerge/automerge-repo-react-hooks";
import { TodoDoc } from "./types";

function App({ docUrl }: { docUrl: AutomergeUrl }) {
  const [doc, changeDoc] = useDocument<TodoDoc>(docUrl);

  return (
    <>
      <div className="card">
        <h2>Todo list</h2>
        <ul>
          {doc &&
            doc.items.map((item, index) => (
              <li key={index}>
                <input
                  type="checkbox"
                  checked={item.done}
                  onChange={(e) =>
                    changeDoc((d) => {
                      d.items[index].done = e.target.checked;
                    })
                  }
                />
                <input
                  value={item.text}
                  onChange={(e) =>
                    changeDoc((d) => {
                      d.items[index].text = e.target.value;
                    })
                  }
                />
                <button
                  onClick={() =>
                    changeDoc((d) => {
                      d.items.splice(index, 1);
                    })
                  }
                >
                  Delete
                </button>
              </li>
            ))}
        </ul>
      </div>
      <div className="card">
        <input type="text" id="newItem" />
        <button
          onClick={() => {
            const newItem = document.getElementById(
              "newItem"
            ) as HTMLInputElement;
            changeDoc((d) => {
              d.items.push({ text: newItem.value, done: false });
            });
            newItem.value = "";
          }}
        >
          +
        </button>
      </div>
      <p className="read-the-docs">
        Built with Automerge, Vite, React, and TypeScript
      </p>
    </>
  );
}

export default App;

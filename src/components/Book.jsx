import React from "react";

const Book = ({ id, title, author, edition, inShelf, onAdd }) => {
  const handleAdd = () => {
    onAdd(id, title, author, edition);
  };

  return (
    <div className="w-64 h-80 p-6 flex flex-col justify-around bg-slate-100">
      <div className="h-3/4">
        <h3>
          Title: <b>{title}</b>
        </h3>
        <br />
        <p>
          Edition Count: <b>{edition}</b>
        </p>
        <br />
        <p>
          Author: <b>{author}</b>
        </p>
      </div>

      <div className="w-full h-12">
        {inShelf ? null : (
          <button
            onClick={handleAdd}
            className="w-full bottom-0 px-4 py-2  bg-slate-200 hover:bg-slate-300"
          >
            Add to Bookshelf
          </button>
        )}
      </div>
    </div>
  );
};

export default Book;

import { useState, useEffect } from "react";

import axios from "axios";

// const startList = [
//     { id: 1, title: "primo", author: "a", content: "qualcosa", category: "a", public: true },
//     { id: 2, title: "secondo", author: "b", content: "qualcosa", category: "b", public: true },
//     { id: 3, title: "terzo", author: "b", content: "qualcosa", category: "c", public: true },
// ]

export default function Form() {
    const initialFormData = { title: "", author: "", content: "", category: "", public: "" }

    // stati lista 
    const [articles, setArticles] = useState([]);
    const [newArticle, setNewArticle] = useState(initialFormData);

    //axios call express-blog-api-crud
    function fetchPosts() {
        axios.get("http://localhost:3000/posts/")
            .then((res) => setArticles(res.data))
            .catch(error => { console.log(error); })
    }

    useEffect(fetchPosts, [])

    function addArticle() {
        event.preventDefault();
        // crea l'id 
        let newid = articles.length === 0 ? 1 : articles[articles.length - 1].id + 1
        //aggiunge l'id al resto dell'oggetto
        let newobj = { id: newid, ...newArticle }
        // crea un nuovo array con l'aggiunta di un elemento 
        let updatedArticles = [...articles, newobj];
        //aggiorna l'array
        setArticles(updatedArticles);
        // pulisce l'input del form
        setNewArticle(initialFormData);
    }

    function removeArticle(i) {
        setArticles(articles.filter((article) => article.id !== i));
    }

    // aggiunge proprietà all'oggetto
    function handleFormData(event) {
        // valuta che tipo di input è 
        const value = event.target.type === "checkbox" ? event.target.checked : event.target.value
        setNewArticle((current) => ({ ...current, [event.target.name]: value }))
    }

    return (
        <>
            <form onSubmit={addArticle}>
                <input type="text"
                    value={newArticle.title}
                    name="title"
                    placeholder="inserire il titolo"
                    onChange={handleFormData} />

                <input type="text"
                    value={newArticle.author}
                    name="author"
                    placeholder="inserire l'autore"
                    onChange={handleFormData} />

                <textarea
                    value={newArticle.content}
                    name="content"
                    placeholder="inserire il contenuto"
                    onChange={handleFormData}></textarea>

                <input type="text"
                    value={newArticle.category}
                    name="category"
                    placeholder="inserire la categoria"
                    onChange={handleFormData} />

                <label htmlFor="public">Pubblicato</label>
                <input type="checkbox"
                    checked={newArticle.public}
                    id="public"
                    name="public"
                    placeholder="inserire la categoria"
                    onChange={handleFormData} />

                <button>Invia</button>
            </form >

            <div className="post">
                {/* se non ci sono posto */}
                {articles.length === 0 && <h2>Non ci sono post</h2>}
                {articles.map((el) =>
                    // <li key={el.id}>{el.title} <button onClick={() => removeArticle(el.id)}>elimina</button></li>
                    <div key={el.id}>
                        <h2>{el.title}</h2>
                        <div>{el.content}</div>
                        <img src={"http://localhost:3000/" + el.image}e alt={el.title} />
                        <div>{el.tags.join(", ")}</div>
                        <button onClick={() => removeArticle(el.id)}>elimina</button>
                    </div>
                )}
            </div>
        </>
    )
}

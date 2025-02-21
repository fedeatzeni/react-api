import { useState, useEffect } from "react";

import axios from "axios";

// const startList = [
//     { id: 1, title: "primo", author: "a", content: "qualcosa", category: "a", public: true },
//     { id: 2, title: "secondo", author: "b", content: "qualcosa", category: "b", public: true },
//     { id: 3, title: "terzo", author: "b", content: "qualcosa", category: "c", public: true },
// ]

export default function Form() {
    const initialFormData = { title: "", content: "", image: "", tags: [] }

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

    function addArticle(event) {
        event.preventDefault();

        //create, chiamta ajax in post con body come argomento
        axios.post("http://localhost:3000/posts/", newArticle)
            .then((res) =>
                setArticles((current => [...current, res.data]))
            )

            .catch(error => { console.log(error); })

        //resetta i campi
        setNewArticle(initialFormData)
    }

    //delete
    function removeArticle(i) {
        axios.delete(`http://localhost:3000/posts/${i}`)
            .then((res) =>
                setArticles(articles.filter((article) => article.id !== i))
            )

            .catch(error => { console.log(error); })
    }

    // aggiunge proprietà all'oggetto
    function handleFormData(event) {
        // trasforma la stringa in un array 
        const value = event.target.name === "tags" ? event.target.value.split(",") : event.target.value
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

                <textarea
                    value={newArticle.content}
                    name="content"
                    placeholder="inserire il contenuto"
                    onChange={handleFormData}></textarea>

                <input type="text"
                    value={newArticle.image}
                    name="image"
                    placeholder="inserire l'immagine"
                    onChange={handleFormData} />


                <input type="text"
                    value={newArticle.tags}
                    name="tags"
                    placeholder="inserire i tag separati da ,"
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
                        <img src={el.image} e alt={el.title} />
                        <div>{el.tags.join(", ")}</div>
                        <button onClick={() => removeArticle(el.id)}>elimina</button>
                    </div>
                )}
            </div>
        </>
    )
}

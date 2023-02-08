import { useEffect, useState } from "react"
import { getArticles, getTopics } from "../utils/api"
import { Link, useSearchParams } from "react-router-dom"

export const Nav = ({setArticles}) => {
    const [topics, setTopics] = useState([])
    let [searchParams, setSearchParams] = useSearchParams()

    const sortByQuery = searchParams.get("category_name")
    const setChosenCategory = (category) =>{
    const newParams = new URLSearchParams(searchParams)
    newParams.set("category_name", category)
    setSearchParams(newParams)
  }

    useEffect(() => {
        getTopics().then((topicsFromApi) => {
            setTopics(topicsFromApi)
        })
        if(sortByQuery) {
            getArticles(sortByQuery).then((queriedArticles) => {
                setArticles(queriedArticles)
            })
        }
    }, [sortByQuery]);

    return (
        <nav id="nav">
            <h2 id="filterHeader">Filter Topic By:</h2>
            {topics.map((topic, index) => {
                return (
                        <button className="filterButton" key={index} onClick={()=>setChosenCategory(topic.slug)}>{topic.slug}</button>
                        )
                    })}
                    <Link className="resetFilterLink" to="/"><button className="resetFilter" onClick={() => getArticles().then((articlesFromApi) => {setArticles(articlesFromApi)})}>Reset Filter</button></Link>
        </nav>
    )
}
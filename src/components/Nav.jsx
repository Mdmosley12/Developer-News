import { useEffect, useState } from "react"
import { getArticles, getTopics } from "../utils/api"
import { Link, useSearchParams } from "react-router-dom"
import { capitaliseString } from "../utils/capitaliseString"

export const Nav = ({setArticles}) => {
    const [topics, setTopics] = useState([])
    const [err, setErr] = useState(null)
    let [searchParams, setSearchParams] = useSearchParams()

    const filterByQuery = searchParams.get("topic")
    const sortByQuery = searchParams.get("sort_by")
    const orderByQuery = searchParams.get("order")

    const setChosenTopic = (topic) => {
        const newParams = new URLSearchParams(searchParams)
        newParams.set("topic", topic)
        setSearchParams(newParams)
    }
    const setChosenSortBy = (sortBy) => {
        const newParams = new URLSearchParams(searchParams)
        newParams.set("sort_by", sortBy)
        setSearchParams(newParams)
    }
    const setChosenOrderBy = (orderBy) => {
        const newParams = new URLSearchParams(searchParams)
        newParams.set("order", orderBy)
        setSearchParams(newParams)
    }

    useEffect(() => {
        getTopics().then((topicsFromApi) => {
            setTopics(topicsFromApi)
        })
        if(filterByQuery || sortByQuery || orderByQuery) {
            getArticles(filterByQuery, sortByQuery, orderByQuery).then((queriedArticles) => {
                setArticles(queriedArticles)
            })
            .catch((err) => {
                console.log(err)
                setErr(err.message)
            })
        }
    }, [filterByQuery, sortByQuery, orderByQuery]);

    if (err) {
        return (
            <div>
                <h1>{err}</h1>
                <Link className="resetFilterLink" to="/"><button className="resetFilter" onClick={() => getArticles().then((articlesFromApi) => {setArticles(articlesFromApi); setErr(null)})}>Reset Filter</button></Link>
            </div>
        )
    } else {
        return (
            <nav id="nav">
                <div id="filterControls">
                    <h2 id="filterHeader">Filter Articles</h2>
                    <br />
                    <h3>Filter by:</h3>
                    {topics.map((topic, index) => {
                        return <button className="filterButton" key={index} onClick={() => setChosenTopic(topic.slug)}>{capitaliseString(topic.slug)}</button>
                    })}
                    <h3>Sort By:</h3>
                    <button id="datePostedFilter" onClick={() => setChosenSortBy('created_at')}>Date Posted</button>
                    <button id="votesFilter" onClick={() => setChosenSortBy('votes')}>Votes</button>
                    <h3>Order By:</h3>
                    <button id="ascending" onClick={() => setChosenOrderBy('ASC')}>Ascending</button>
                    <button id="descending" onClick={() => setChosenOrderBy('DESC')}>Descending</button>
                    <Link className="resetFilterLink" to="/"><button className="resetFilter" onClick={() => getArticles().then((articlesFromApi) => {setArticles(articlesFromApi)})}>Reset Filter</button></Link>
                </div>
            </nav>
        )
    }
}
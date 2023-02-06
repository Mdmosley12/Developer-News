import { useEffect, useState } from "react"
import { getTopics } from "../utils/api"
import { Link } from "react-router-dom"

export const Nav = () => {
    const [topics, setTopics] = useState([])

    useEffect(() => {
        getTopics().then((topicsFromApi) => {
            setTopics(topicsFromApi)
        })
    }, []);

    return (
        <nav id="nav">
            {topics.map((topic, index) => {
                return ( 
                <Link to="/" key={index}>{topic.slug}
                |
                </Link>
                )
            })}
        </nav>
    )
}
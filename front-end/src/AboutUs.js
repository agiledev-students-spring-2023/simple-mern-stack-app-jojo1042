import './AboutUs.css'
import { useState, useEffect } from 'react'
import axios from 'axios'

const AboutUs = props => {
    const [aboutus, setAboutUs] = useState([])
  
    const fetchAboutUs = () => {
      axios
        .get(`${process.env.REACT_APP_SERVER_HOSTNAME}/aboutus`)
        .then(response => {
          const aboutus = response.data
          setAboutUs(aboutus)
        })
    }

    useEffect(() => {
        fetchAboutUs()

      }, [])

    return (
       <>
       {/* {JSON.stringify(aboutus.text)} */}
       {aboutus.map(about => (
        aboutus.text
      ))}
       </>
    )
}
export default AboutUs
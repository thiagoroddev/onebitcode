import Title from "../Tittle"
import LinkButton from "../LinkButton"
import ProfileSection from "./ProfileSection"
import styles from "./styles.module.css"
import React from "react";

export default function Profile(props) {
  const [followText, setFollowText] = React.useState('Seguir');

  function handleClick() {
    alert('Seguindo2!');
    setFollowText('Seguindooo');
  } 

  return (
    <div className={styles.container}>
      <img className={styles.avatar} src={props.avatar} alt={props.name} />
      <Title>
        <span>{props.name}</span>
        <button
          className={styles.followButton}
          onClick={handleClick}
          >{followText}
        </button>
      </Title>
      <ProfileSection>{props.bio}</ProfileSection>
      <ProfileSection>{props.phone}</ProfileSection>
      <ProfileSection>{props.email}</ProfileSection>
      <ProfileSection
       className={styles.links}
       id="links-section"
       data-test='some'
       aria-label="Links to social media profiles"     
      >
        <LinkButton href={props.githubUrl} target="_blank">GitHub</LinkButton>
        <LinkButton href={props.linkedinUrl} target="_blank">LinkedIn</LinkButton>
        <LinkButton href={props.twitterUrl} target="_blank">Twitter</LinkButton>
      
      </ProfileSection>
    </div>
  )
}
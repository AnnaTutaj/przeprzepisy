import React from "react";
import { Link } from "react-router-dom";
import { Dropdown, Image, Menu } from "semantic-ui-react";


const SignedInMenu = ({signOut, profile}) => {
  const trigger = <Image avatar src={profile.pictureURL || '/assets/dummyUser.png'} />;

  return (
    <Menu.Item position='right'>
      <Dropdown pointing='top left' trigger={trigger}>
        <Dropdown.Menu>
          {/* todo gdy już będzie zmienione logowanie, to zmienić na nick */}
          <Dropdown.Header content={`Profil ${profile.nick}`} />
          <Dropdown.Item text='Mój profil' icon='user' />
          <Dropdown.Item
            as={Link}
            to='/ustawienia'
            text='Ustawienia'
            icon='setting'
          />
          <Dropdown.Item text='Moje przepisy' icon='clipboard outline' />
          <Dropdown.Item text='Obeserwuję' icon='users' />
          <Dropdown.Item
            text='Wyloguj się'
            icon='power off'
            onClick={signOut}
          />
        </Dropdown.Menu>
      </Dropdown>
    </Menu.Item>
  );
};

export default SignedInMenu;

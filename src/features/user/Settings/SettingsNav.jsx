import React from "react";
import { NavLink } from "react-router-dom";
import { Menu } from "semantic-ui-react";

const SettingsNav = () => {
  return (
    <>
      <Menu vertical>
        <Menu.Item as={NavLink} to='/ustawienia/szczegoly-profilu'>
          Szczegóły profilu
        </Menu.Item>
        <Menu.Item as={NavLink} to='/ustawienia/zmien-haslo'>
          Zmień hasło
        </Menu.Item>
        <Menu.Item as={NavLink} to='/ustawienia/zdjecia'>
          Moje zdjęcia
        </Menu.Item>
      </Menu>
    </>
  );
};

export default SettingsNav;

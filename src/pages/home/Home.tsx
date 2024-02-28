import { Button, Text, Center } from '@mantine/core';
import {useViewportSize} from '@mantine/hooks';
import React, { useEffect, useState } from 'react';
import {Outlet, Link} from 'react-router-dom';

import Pokemon from '../Pokemon/Pokemon';
import './Home.styles.scss';

export type TPkmn = {
  name: string,
  abilities: {
    ability: {name: string,
              url: string}
  }[]
}





const Home = () => {
  return (
    <div className='Main-Background Home-Background'>
      <img src='https://upload.wikimedia.org/wikipedia/commons/9/98/International_Pok%C3%A9mon_logo.svg' alt='pokemon-logo' className='Logo'/>
      <Button size="xl" color="rgba(42, 117, 187, 1)" component={Link} to='/pokemon'>To All Pokemon</Button>
    </div>
  )
}

export default Home;
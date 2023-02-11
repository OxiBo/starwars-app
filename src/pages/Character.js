import React from 'react';
import { useParams } from 'react-router-dom';
export default function Character() {
  const navigation = useParams();
  console.log(navigation);

  return <div>Single Character</div>;
}

import React from 'react';
import styled from 'styled-components';

const Loader = () => {
  return (
    <StyledWrapper className='h-96 flex flex-col justify-center items-center'>
      <div className="container">
        <div className="item item-1" />
        <div className="item item-2" />
        <div className="item item-3" />
        <div className="item item-4" />
      </div>
      <p className='text-xl mt-36 animate-pulse'>Loading...</p>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .container {
    position: absolute;
    width: 100px;
    height: 100px;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
  }

  .item {
    width: 50px;
    height: 50px;
    position: absolute;
  }

  .item-1 {
    background-color: rgb(250, 87, 103);
    top: 0;
    left: 0;
    z-index: 1;
    animation: item-1_move 1.8s cubic-bezier(.6,.01,.4,1) infinite;
  }

  .item-2 {
    background-color: rgb(121, 68, 228);
    top: 0;
    right: 0;
    animation: item-2_move 1.8s cubic-bezier(.6,.01,.4,1) infinite;
  }

  .item-3 {
    background-color: rgb(27, 145, 247);
    bottom: 0;
    right: 0;
    z-index: 1;
    animation: item-3_move 1.8s cubic-bezier(.6,.01,.4,1) infinite;
  }

  .item-4 {
    background-color: rgb(250, 194, 76);
    bottom: 0;
    left: 0;
    animation: item-4_move 1.8s cubic-bezier(.6,.01,.4,1) infinite;
  }

  @keyframes item-1_move {
    0%, 100% {
      transform: translate(0, 0)
    }

    25% {
      transform: translate(0, 50px)
    }

    50% {
      transform: translate(50px, 50px)
    }

    75% {
      transform: translate(50px, 0)
    }
  }

  @keyframes item-2_move {
    0%, 100% {
      transform: translate(0, 0)
    }

    25% {
      transform: translate(-50px, 0)
    }

    50% {
      transform: translate(-50px, 50px)
    }

    75% {
      transform: translate(0, 50px)
    }
  }

  @keyframes item-3_move {
    0%, 100% {
      transform: translate(0, 0)
    }

    25% {
      transform: translate(0, -50px)
    }

    50% {
      transform: translate(-50px, -50px)
    }

    75% {
      transform: translate(-50px, 0)
    }
  }

  @keyframes item-4_move {
    0%, 100% {
      transform: translate(0, 0)
    }

    25% {
      transform: translate(50px, 0)
    }

    50% {
      transform: translate(50px, -50px)
    }

    75% {
      transform: translate(0, -50px)
    }
  }`;

export default Loader;

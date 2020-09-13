# Zombie Apocalypse v4.5

Zombie Apocalypse v4.5 is an application that simulates a map with
zombies and creature and executes a path for the zombie to move and infect the creatures.

## Design

This application has been split into 2 main components. The first is reading in the input and validating/parsing the user input. The 2nd component is the execution of the simulator setup which handles the core functionality. The reason for the split is to enforce separation of concerns and allow for additional ways of reading in input without needing to change the core functionality.

In the simulator, the effects of the board e.g moving the zombie or creature being eaten by zombie all result in a board transition change. The reason for going this approach is, its easier to understand what has changed because we can see what the board was before and what it is now. It also allows for easy auditability by being able to log the transition of board changes like how in React/Redux we can see the state changes when an action is executed.

## Requirements

- NodeJS v14.3 or higher

## Installation

- `npm i`

## How to run

- `npm run start`

An example scenario might look like this

```bash
✔ What is the dimension of the board? … 4
✔ What is the position of zombie? … 2,1
✔ What is the positions of the creature? … 0,1 1,2 3,1
✔ What is the movements of the zombie? … DLUURR
[1599997951523] INFO  (22819 on Andrews-MBP):
    zombies` score: 3
    zombies` positions:
    (3,0) (2,1) (1,0) (0,0)
```

## How to run tests

- `npm run test`

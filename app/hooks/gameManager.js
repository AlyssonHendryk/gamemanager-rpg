"use client"

import { useState } from "react"

export default function useGameManager() {
  const createHero = () => ({
    name: "Herói",
    hp: 100,
    maxHp: 100,
    mana: 30,
    maxMana: 30,
    potions: 3,
    xp: 0,
    level: 1,
  })

  const createEnemy = () => ({
    name: "Mercenário",
    hp: 100,
    maxHp: 100,
  })

  const [hero, setHero] = useState(createHero())
  const [enemy, setEnemy] = useState(createEnemy())
  const [history, setHistory] = useState([])
  const [gameOver, setGameOver] = useState(false)

  const addHistory = (text) => {
    setHistory((prev) => [text, ...prev])
  }

  const enemyAttack = (nextHero) => {
    if (enemy.hp <= 0) return

    const damage = Math.floor(Math.random() * 12) + 6

    nextHero.hp = Math.max(
      0,
      nextHero.hp - damage
    )

    addHistory(
      `Mercenário atacou e causou ${damage} de dano`
    )

    if (nextHero.hp <= 0) {
      addHistory("Herói foi derrotado")
      setGameOver(true)
    }
  }

  const victory = (nextHero) => {
    nextHero.xp += 25

    if (Math.random() > 0.5) {
      nextHero.potions += 1
      addHistory("Você encontrou 1 poção")
    }

    if (nextHero.xp >= 100) {
      nextHero.level += 1
      nextHero.xp = 0
      addHistory(`Level Up! ${nextHero.level}`)
    }

    setGameOver(true)
  }

  const attackSword = () => {
    if (gameOver) return

    const damage = Math.floor(Math.random() * 15) + 10

    const nextEnemy = { ...enemy }
    nextEnemy.hp -= damage

    addHistory(
      `Ataque causou ${damage} de dano`
    )

    if (nextEnemy.hp <= 0) {
      nextEnemy.hp = 0

      const nextHero = { ...hero }

      victory(nextHero)

      setHero(nextHero)
      setEnemy(nextEnemy)

      return
    }

    const nextHero = { ...hero }

    enemyAttack(nextHero)

    setHero(nextHero)
    setEnemy(nextEnemy)
  }

  const attackMagic = () => {
    if (hero.mana < 10 || gameOver) return

    const nextHero = {
      ...hero,
      mana: hero.mana - 10,
    }

    const damage = Math.floor(Math.random() * 25) + 15

    const nextEnemy = { ...enemy }

    nextEnemy.hp -= damage

    addHistory(
      `Magia causou ${damage} de dano`
    )

    if (nextEnemy.hp <= 0) {
      nextEnemy.hp = 0

      victory(nextHero)

      setHero(nextHero)
      setEnemy(nextEnemy)

      return
    }

    enemyAttack(nextHero)

    setHero(nextHero)
    setEnemy(nextEnemy)
  }

  const defend = () => {
    addHistory("Herói se defendeu")
  }

  const usePotion = () => {
    if (hero.potions <= 0 || gameOver) return

    setHero({
      ...hero,
      hp: Math.min(hero.maxHp, hero.hp + 30),
      potions: hero.potions - 1,
    })

    addHistory("Herói usou uma poção")
  }

  const resetGame = () => {
    setEnemy(createEnemy())
    setGameOver(false)
    addHistory("Nova batalha iniciada")
  }

  return {
    hero,
    enemy,
    history,
    gameOver,
    attackSword,
    attackMagic,
    defend,
    usePotion,
    resetGame,
  }
}
package models

import (
	"gorm.io/gorm"
)

type PomodoroModel struct {
	gorm.Model
	UserID                  uint   `gorm:"unique"`
	PomodoroDuration        int    `gorm:"default:25"`
	ShortBreakDuration      int    `gorm:"default:5"`
	LongBreakDuration       int    `gorm:"default:15"`
	IsRunning               bool   `gorm:"default:false"`
	CurrentPhase            string `gorm:"default:'pomodoro'"`
	RemainingTime           int    `gorm:"default:0"`
	CompletedPomodoros      int    `gorm:"default:0"`
	TotalCompletedPomodoros int    `gorm:"default:0"`
	AutoTransition          bool   `gorm:"default:false"`
}

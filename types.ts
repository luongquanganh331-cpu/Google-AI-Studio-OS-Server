
import React from 'react';

export type AppID = 
  | 'browser' 
  | 'gemini' 
  | 'messages' 
  | 'files' 
  | 'notes' 
  | 'settings' 
  | 'terminal' 
  | 'calculator' 
  | 'camera' 
  | 'gallery' 
  | 'store' 
  | 'server-manager';

export interface AppConfig {
  id: AppID;
  name: string;
  icon: string;
  color: string;
  component: React.ReactNode;
}

export enum OSVersion {
  STANDARD = 'OS v2.0-AI',
  LTSC = 'LTSC Enterprise',
  DEMO = 'Preview Demo',
  SERVER = 'Server Core AI'
}

export interface Message {
  role: 'user' | 'model';
  content: string;
}

export type SystemStatus = 'booting' | 'locked' | 'desktop' | 'shutting-down' | 'off';

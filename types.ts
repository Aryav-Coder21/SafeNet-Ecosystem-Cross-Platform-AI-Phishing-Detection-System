export enum ThreatLevel {
  SAFE = 'SAFE',
  SUSPICIOUS = 'SUSPICIOUS',
  PHISHING = 'PHISHING',
  UNKNOWN = 'UNKNOWN'
}

export interface AnalysisResult {
  url: string;
  status: ThreatLevel;
  confidence: number;
  threatLevelLabel: string;
  reasons: string[];
  timestamp: string;
  ipAddress?: string;
  serverLocation?: string;
}

export interface ScanHistoryItem extends AnalysisResult {
  id: string;
}

export interface ChartDataPoint {
  name: string;
  safe: number;
  threats: number;
}

export type UserRole = 'admin' | 'user';

export interface User {
  username: string;
  role: UserRole;
  password?: string; // stored in memory for demo
  email?: string;
}

export interface CommunityReport {
  id: string;
  url: string;
  reportedBy: string;
  timestamp: string;
  type: 'Phishing' | 'Safe' | 'Malware';
  status: 'Pending' | 'Verified' | 'Rejected';
  notes: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  timestamp: Date;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success';
  time: string;
  read: boolean;
}
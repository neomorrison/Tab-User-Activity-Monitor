import React, { useEffect, useRef, useState } from 'react';
import './App.css';

export default function TabActivityMonitor() {
  const [logs, setLogs] = useState([]);
  const [idle, setIdle] = useState(false);
  const [isTabActive, setIsTabActive] = useState(true);
  const terminalRef = useRef(null);
  let idleTimer;

  const logEvent = (msg, isTabLeave = false) => {
    const timestamp = new Date().toLocaleTimeString();
    const logEntry = {
      text: `[${timestamp}] ${msg}`,
      isAlert: isTabLeave
    };
    setLogs(prev => [...prev, logEntry]);
    if (isTabLeave) {
      console.log(`[TAB LEAVE DETECTED] ${msg}`);
    }
  };

  useEffect(() => {
    const resetIdleTimer = () => {
      if (idle) {
        setIdle(false);
        logEvent('User is active again');
      }
      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => {
        setIdle(true);
        logEvent('User is idle (no interaction for 60s)', true);
      }, 60000);
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        setIsTabActive(false);
        logEvent('Document hidden (tab switch or minimized)', true);
      } else {
        setIsTabActive(true);
        logEvent('Document visible');
      }
    };

    const handleWindowBlur = () => {
      setIsTabActive(false);
      logEvent('Window lost focus', true);
    };

    const handleWindowFocus = () => {
      setIsTabActive(true);
      logEvent('Window gained focus');
    };

    const handleBeforeUnload = () => logEvent('User is attempting to leave the page', true);

    const handleCopy = async () => {
      try {
        const text = await navigator.clipboard.readText();
        logEvent(`User copied: "${text}"`);
      } catch {
        logEvent('Copy detected but clipboard read denied', true);
      }
    };

    const handleKeydown = (e) => {
      if (isTabActive) {
        logEvent(`Key pressed: ${e.key}`);
      }
    };

    const handleSelection = () => {
      const selection = window.getSelection().toString();
      if (selection.length > 0) {
        logEvent(`User highlighted text: "${selection}"`);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleWindowBlur);
    window.addEventListener('focus', handleWindowFocus);
    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('mousemove', resetIdleTimer);
    window.addEventListener('keydown', resetIdleTimer);
    window.addEventListener('scroll', resetIdleTimer);
    window.addEventListener('click', resetIdleTimer);
    window.addEventListener('copy', handleCopy);
    window.addEventListener('keydown', handleKeydown);
    window.addEventListener('mouseup', handleSelection);

    resetIdleTimer();
    document.body.classList.add('active');

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handleWindowBlur);
      window.removeEventListener('focus', handleWindowFocus);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('mousemove', resetIdleTimer);
      window.removeEventListener('keydown', resetIdleTimer);
      window.removeEventListener('scroll', resetIdleTimer);
      window.removeEventListener('click', resetIdleTimer);
      window.removeEventListener('copy', handleCopy);
      window.removeEventListener('keydown', handleKeydown);
      window.removeEventListener('mouseup', handleSelection);
    };
  }, [idle, isTabActive]);

  useEffect(() => {
    document.body.className = isTabActive ? 'active' : 'inactive';
  }, [isTabActive]);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="main-container">
      <h1>Tab & User Activity Monitor</h1>
      <p>Tracking visibility, focus, clipboard, keystrokes, and selection. Leave the tab or go idle to see logs.</p>
      <div className="terminal-box">
        <div className="terminal-header">
          <div className="btn red" />
          <div className="btn yellow" />
          <div className="btn green" />
        </div>
        <div className="terminal-body" ref={terminalRef}>
          {logs.map((log, i) => (
            <div key={i} className={`terminal-line ${log.isAlert ? 'text-red' : 'text-green'}`}>{log.text}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

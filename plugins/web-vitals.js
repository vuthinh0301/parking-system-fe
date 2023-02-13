import { initializeApp } from 'firebase/app'
import { getAnalytics, logEvent } from 'firebase/analytics'
import { onCLS, onFCP, onFID, onINP, onLCP, onTTFB } from 'web-vitals'

const firebaseConfig = {
  apiKey: 'AIzaSyCwCd3TIXmoOoPqgKFl7x4wTUKzk3zS-sE',
  authDomain: 'reliable-vector-376602.firebaseapp.com',
  projectId: 'reliable-vector-376602',
  storageBucket: 'reliable-vector-376602.appspot.com',
  messagingSenderId: '550885480086',
  appId: '1:550885480086:web:05f12ad25dacfb0b0754b7',
  measurementId: 'G-CM9SYY4CH1',
}

const app = initializeApp(firebaseConfig)
export const analytics = getAnalytics(app)

function sendToGoogleAnalytics({ name, delta, id, rating }) {
  logEvent(analytics, name, {
    event_category: 'Web Vitals',
    name,
    event_label: id,
    value: Math.round(name === 'CLS' ? delta * 1000 : delta),
    rating,
  })
}

onCLS(sendToGoogleAnalytics)
onFID(sendToGoogleAnalytics)
onLCP(sendToGoogleAnalytics)
onTTFB(sendToGoogleAnalytics)
onFCP(sendToGoogleAnalytics)
onINP(sendToGoogleAnalytics)

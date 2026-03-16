import React, { useState, useEffect } from 'react';
import { Linkedin, Mail, MapPin, Phone, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, signInAnonymously, onAuthStateChanged } from "firebase/auth";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// --- SAFE INITIALIZATION ---
let app;
if (getApps().length === 0) {
    app = initializeApp(firebaseConfig);
} else {
    app = getApp();
}

const auth = getAuth(app);
const db = getFirestore(app);

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

// Define component as a named function first
function ContactSection() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState({ type: '', message: '' });
    const [user, setUser] = useState(null);
    const [authError, setAuthError] = useState(null);

    useEffect(() => {
        if (!auth) return;

        const initAuth = async () => {
            try {
                await signInAnonymously(auth);
            } catch (error) {
                console.error("Auth Error:", error);
                setAuthError("Please enable Anonymous Auth in Firebase Console.");
            }
        };
        initAuth();
        
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!user) {
            setStatus({ type: 'error', message: 'Connecting to server... please wait.' });
            return;
        }

        setIsLoading(true);
        setStatus({ type: '', message: '' });

        try {
            await addDoc(collection(db, 'messages'), {
                ...formData,
                uid: user.uid,
                createdAt: serverTimestamp()
            });

            setStatus({ type: 'success', message: 'Message sent successfully!' });
            setFormData({ name: '', email: '', message: '' });
            setTimeout(() => setStatus({ type: '', message: '' }), 5000);

        } catch (error) {
            console.error("Firestore Error:", error);
            let errorMsg = "Failed to send message.";
            
            if (error.code === 'permission-denied') {
                errorMsg = "Database Locked: Check Firestore Rules in Console.";
            } else if (error.code === 'unavailable') {
                errorMsg = "Network Error: Check your internet connection.";
            }
            
            setStatus({ type: 'error', message: errorMsg });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section id="contact" className="py-24 px-4 relative bg-secondary/30 text-slate-100">
            <style>{`
                .cosmic-button { 
                    background: linear-gradient(to right, #6366f1, #a855f7);
                    color: white;
                    transition: opacity 0.2s;
                }
                .cosmic-button:hover { opacity: 0.9; }
            `}</style>

            <div className="container mx-auto max-w-5xl">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
                    Get In <span className="text-primary">Touch</span>
                </h2>

                <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
                    I Am Always Open To Discussing New Opportunities
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="space-y-8">
                        <h3 className="text-2xl font-semibold mb-6">Contact Information</h3>
                        <div className="space-y-6 justify-center">
                            <div className="flex items-center space-x-4">
                                <div className="p-3 rounded-full bg-primary/10">
                                    <Mail className="h-6 w-6 text-primary"/>
                                </div>
                                <div>
                                    <h4 className="font-medium">Email</h4>
                                    <a href="mailto:somilpachauri@gmail.com" className="text-muted-foreground hover:text-primary transition-colors">somilpachauri@gmail.com</a>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4">
                                <div className="p-3 rounded-full bg-primary/10">
                                    <Phone className="h-6 w-6 text-primary"/>
                                </div>
                                <div>
                                    <h4 className="font-medium px-18">Phone</h4>
                                    <a href="tel:+918595066436" className="text-muted-foreground hover:text-primary transition-colors">+91 85950 66436</a>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4">
                                <div className="p-3 rounded-full bg-primary/10">
                                    <MapPin className="h-6 w-6 text-primary"/>
                                </div>
                                <div>
                                    <h4 className="font-medium">Location</h4>
                                    <span className="text-muted-foreground">Dehradun, Uttarakhand, India.</span>
                                </div>
                            </div>
                        </div>
                        <div className="pt-8 flex flex-col items-center">
                            <h4 className="font-medium mb-4">Connect With Me</h4>
                            <div className="flex space-x-4 ">
                                <a href='https://www.linkedin.com/in/somilpachauri' target="_blank" rel="noreferrer">
                                    <Linkedin className="text-slate-400 hover:text-primary transition-colors"/>
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="bg-card p-8 rounded-lg shadow-sm border border-slate-800 bg-slate-900/50">
                        <h3 className="text-2xl font-semibold mb-6">Send A Message</h3>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium mb-2">Your Name</label>
                                <input type="text" id="name" name="name" required value={formData.name} onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-md border border-slate-700 bg-slate-950 focus:outline-none focus:ring-2 focus:ring-primary text-white" placeholder="Name..." />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium mb-2">Your Email</label>
                                <input type="email" id="email" name="email" required value={formData.email} onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-md border border-slate-700 bg-slate-950 focus:outline-none focus:ring-2 focus:ring-primary text-white" placeholder="Email..." />
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-medium mb-2">Your Message</label>
                                <textarea id="message" name="message" required value={formData.message} onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-md border border-slate-700 bg-slate-950 focus:outline-none focus:ring-2 focus:ring-primary resize-none text-white" rows="4" placeholder="Hello! I would like to talk about...." />
                            </div>

                            {(status.message || authError) && (
                                <div className={`p-3 rounded-md flex items-center gap-2 text-sm ${
                                    status.type === 'success' ? 'bg-green-900/30 text-green-400 border border-green-900' : 'bg-red-900/30 text-red-400 border border-red-900'
                                }`}>
                                    {status.type === 'success' ? <CheckCircle className="w-4 h-4"/> : <AlertCircle className="w-4 h-4"/>}
                                    {authError || status.message}
                                </div>
                            )}

                            <button 
                                type="submit" 
                                disabled={isLoading || !user}
                                className={cn("cosmic-button w-full flex items-center justify-center gap-2 py-3 rounded-md font-medium", (isLoading || !user) && "opacity-50 cursor-not-allowed")}
                            >
                                {isLoading ? (
                                    <>Sending... <Loader2 className="animate-spin w-4 h-4" /></>
                                ) : (
                                    "Send Message"
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}

// --- EXPORT BOTH WAYS ---
// This fixes the "does not provide an export named" error
export { ContactSection };
export default ContactSection;
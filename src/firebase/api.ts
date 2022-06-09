import { to } from "utils";
import { app, auth, analytics, db } from "./firebase-config";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInAnonymously } from 'firebase/auth';

// Sign In Anonymously
export async function anonymousSignIn() {
  return await to(signInAnonymously(auth));
}

// Sign In With Email
export async function signInWithEmail(email: string, password: string) {
  return await to(signInWithEmailAndPassword(auth, email, password));
}

// Sign Up With Email
export async function signUpWithEmail(email: string, password: string) {
  return await to(createUserWithEmailAndPassword(auth, email, password));
}

/*
// Reset Password
export async function resetPassword(email: string) {
  return await to(firebase.auth().sendPasswordResetEmail(email));
}

// Confirm Email
export async function confirmEmail() {
  return await to(firebase.auth().currentUser.sendEmailVerification());
}

// Get Current User
export async function getCurrentUser() {
  return await to(firebase.auth().currentUser);
}

// Sign Out
export function signOut() {
  firebase.auth().signOut();
}

// Update User Image Property
export async function updateUserImageProperty(imgUrl: string) {
  return await to(db.collection("users").doc(auth.currentUser.uid).update({image: imgUrl}))
};

// Update User's Team
export async function updateUserTeam(groupName: string) {
  return await to(db.collection("users").doc(auth.currentUser.uid).update({teams: firebase.firestore.FieldValue.arrayUnion(groupName)}))
};

// Update User Profile
export async function updateUserProfile(image: string, firstName: string, lastName: string, phoneNumber: string) {
  return await to(db.collection("users").doc(auth.currentUser.uid).update({
    image: image,
    firstName: firstName,
    lastName: lastName,
    phoneNumber: phoneNumber,
  }))
};

// Add User Information
export async function addUserInformation(newUser: firebase.auth.UserCredential, email: string, firstName: string, lastName: string, phoneNumber: string) {
  return await to(db.collection("users").doc(newUser.user.uid).set({
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    id: `maet-user-${newUser.user.uid}`,
    email: email,
    firstName: firstName,
    lastName: lastName,
    userName: `${email.split("@")[0]}@${newUser.user.uid.slice(0, 4).toUpperCase()}`,
    phoneNumber: phoneNumber,
    sport: "basketball-3v3",
    teams: [],
    pendingTeams: [],
    games: [],
    image: "defaultUserImageUrl",
    rating: [1200, 150, 10],
    isVerified: false,
    isCaptain: false,
  }));
}

// Add Team Information
export async function addTeamInformation(captain: string, groupName: string, displayName: string) {
  return await to(db.collection("teams").add({
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    id: `maet-team-${auth.currentUser.uid}`,
    groupName: groupName,
    name: displayName,
    captains: [captain],
    players: [captain],
    sport: "basketball-3v3",
    pendingPlayers: [],
    pendingGames: [],
    games: [],
    image: "defaultUserImageUrl",
    rating: [1200, 150, 10],
  }));
}

// Update Team Image Property
export async function updateTeamImageProperty(teamUid: string, imgUrl: string) {
  return await to(db.collection("teams").doc(teamUid).update({image: imgUrl}))
};


// Update Team Profile
export async function updateTeamProfile(teamUid: string, image: string, groupName: string, displayName: string) {
  return await to(db.collection("users").doc(auth.currentUser.uid).update({
    id: `maet-team-${teamUid}`,
    image: image,
    groupName: groupName,
    name: displayName,
  }))
};

// Get User Info
export async function getUserInfo(id: string) {
  return await to(db.collection('users').doc(id).get());
}

// Get Team Info
export async function getTeamInfo(id: string) {
  return await to(db.collection('teams').doc(id).get());
}

// Get Game Info
export async function getGameInfo(id: string) {
  return await to(db.collection('games').doc(id).get());
}

// User Maet ID Search
export async function userIdSearch(id: string) {
  return await to(db.collection('users').where("id", "==", `maet-user-${id}`).get());
}

// Team Maet ID Search
export async function teamIdSearch(id: string) {
  return await to(db.collection('teams').where("id", "==", `maet-team-${id}`).get());
}

// Game Maet ID Search
export async function gameIdSearch(id: string) {
  return await to(db.collection('games').where("id", "==", `maet-game-${id}`).get());
}

// Get All Users
export async function getUsers() {
  return await to(db.collection('users').get());
}

// Get All Teams
export async function getTeams() {
  return await to(db.collection('teams').get());
}

// Get All Games
export async function getGames() {
  return await to(db.collection('games').get());
}

*/

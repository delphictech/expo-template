"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions-test");
require("jest");
const index_1 = require("./index");
const index_2 = require("../index");
/**
 * @resources
 * https://h-malik144.medium.com/jest-testing-for-firebase-functions-a51ce1094d38
 * https://firebase.google.com/docs/functions/local-emulator#set_up_admin_credentials_optional
*/
/**
 * Configure the testing environment
 */
const testEnv = functions({ projectId: process.env.PROJECT_NAME }, 'service-account.json');
/**
 * Function will create the public data input to the testing functions
 *
 * @param {PrivateUserData} privateUserData
 * @return {*}  {PublicUserData}
 */
const createDataInput = (privateUserData) => ({
    id: privateUserData.id,
    firstName: privateUserData.firstName || null,
    lastName: privateUserData.lastName || null,
    count: privateUserData.count || null,
    image: privateUserData.image || null,
});
/**
 * Run the testing
 */
describe('Firebase functions testing', () => {
    /**
     * Generic testing function for onWrite function for all user data
     *
     * @param {(WrappedScheduledFunction | WrappedFunction<Change<DocumentSnapshot>, void>)} wrappedOnWrite
     * @param {PrivateUserData} privateUserData
     * @param {string} privatePath
     * @param {string} publicPath
     * @return {*}  {PublicUserData}
     */
    const testFunction = async (wrappedOnWrite, privateUserData, privatePath, publicPath) => {
        const changeDoc = {
            before: testEnv.firestore.makeDocumentSnapshot({}, privatePath),
            after: testEnv.firestore.makeDocumentSnapshot(privateUserData, privatePath),
        };
        // call firebase function with the changes inputted to the function
        await wrappedOnWrite(changeDoc);
        const after = await index_2.db.doc(publicPath).get();
        return after.data();
    };
    // declare wrapped as a scheduled firebase function that has not been invoked yet
    let wrappedOnWrite;
    beforeAll(() => {
        // wrap the firebase function, ready to be invoked
        wrappedOnWrite = testEnv.wrap(index_1.updatePublicUserData);
    });
    /**
     * Test 1: typical private user data
     */
    let privateUserData = {
        id: 'testing-user',
        firstName: 'Snoopy',
        lastName: 'Smith',
        count: 7,
        image: 'https://yt3.ggpht.com/a/AGF-l79gvcqBbQiq6cwh9GC8FpdUjs0WAAeo7_8D2g=s900-c-k-c0xffffffff-no-rj-mo',
        email: 'snoops@example.com',
        emailVerified: true,
        isAnonymous: false,
        loggedIn: true,
    };
    const privatePath = `private-user-data/${privateUserData.id}`;
    const publicPath = `public-user-data/${privateUserData.id}`;
    test('TEST 1: typical private user data', async () => {
        const publicUserData = createDataInput(privateUserData);
        const returnedData = await testFunction(wrappedOnWrite, privateUserData, privatePath, publicPath);
        // expect it to be the same data object, which is what toStrictEqual checks
        expect(returnedData).toEqual(publicUserData);
    });
    /**
     * Test 2: undefined properties
    */
    privateUserData = {
        id: 'testing-user',
        firstName: 'Snoopy',
        lastName: 'Smith',
        image: 'https://yt3.ggpht.com/a/AGF-l79gvcqBbQiq6cwh9GC8FpdUjs0WAAeo7_8D2g=s900-c-k-c0xffffffff-no-rj-mo',
        email: 'snoops@example.com',
        emailVerified: true,
        isAnonymous: false,
        loggedIn: true,
    };
    test('TEST 2: undefined count', async () => {
        const publicUserData = createDataInput(privateUserData);
        const returnedData = await testFunction(wrappedOnWrite, privateUserData, privatePath, publicPath);
        // expect it to be the same data object, which is what toStrictEqual checks
        expect(returnedData).toEqual(publicUserData);
    });
    afterAll(async () => {
        // cleanup the private data, any env variables and firebase apps
        testEnv.cleanup();
        // delete firebase function data for onWrite function
        await index_2.db.doc(publicPath).delete();
    });
});
//# sourceMappingURL=user.test.js.map
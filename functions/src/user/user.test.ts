import * as functions from 'firebase-functions-test';
import { db, makeDetailedData } from '../index';
import 'jest';
import { DocumentSnapshot } from 'firebase-functions/v1/firestore';
import { WrappedFunction, WrappedScheduledFunction } from 'firebase-functions-test/lib/main';
import { Change } from 'firebase-functions/v1';

/*
    Shifted to making individual document snapshots for before and after
    https://h-malik144.medium.com/jest-testing-for-firebase-functions-a51ce1094d38
    https://firebase.google.com/docs/functions/local-emulator#set_up_admin_credentials_optional
    No need to run firebase emulators
    Set the env variable for project name
    download the service account name, add to your gitignore
*/


const testEnv = functions({ projectId: process.env.PROJECT_NAME }, './service-account.json');

// declare tests 
describe("Firebase functions testing", () => {
    
    // declare wrapped as a scheduled firebase function that has not been invoked yet
    let wrapped: WrappedScheduledFunction | WrappedFunction<Change<DocumentSnapshot>, void>;

    beforeAll(() => {
        // wrap the firebase function, ready to be invoked
        wrapped = testEnv.wrap(makeDetailedData);
    });

    // declare the data to test
    const privateUserData = {
        uid: 'testing-user',
        name: 'seth',
        count: '7',
        image: 'dasadsadaawd',
        email: 'seth@email',
        emailVerified: true,
        phone: 1234566,
    };

    const publicUserData  = {
        name: privateUserData.name,
        count: privateUserData.count,
        image: privateUserData.image,
    };

    const privatePath = `private-user-data/${privateUserData.uid}`;
    const publicPath = `public-user-data/${privateUserData.uid}`;

    // run the test
    test("Testing firebase function", async () => {

        // create the example snapshots
        // we can change the inputted data for before and after depending on if we want the data to change at all.
        const changeDoc: Change<DocumentSnapshot> = {
            before: testEnv.firestore.makeDocumentSnapshot(privateUserData, privatePath),
            after: testEnv.firestore.makeDocumentSnapshot(privateUserData, privatePath),
        };

        // call firebase function with the changes inputted to the function
        await wrapped(changeDoc);

        const after = await db.doc(publicPath).get();

        // expect it to be the same data object, which is what toStrictEqual checks
        expect(after.data()).toStrictEqual(publicUserData);

    });

    afterAll(async () => {

        // cleanup the private data, any env variables and firebase apps
        testEnv.cleanup();

        // delete firebase function data
        await db.doc(publicPath).delete();
        
    });

});

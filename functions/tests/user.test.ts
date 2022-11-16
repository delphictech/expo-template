import * as functions from 'firebase-functions-test';
import 'jest';
import { DocumentSnapshot } from 'firebase-functions/v1/firestore';
import { WrappedFunction, WrappedScheduledFunction } from 'firebase-functions-test/lib/main';
import { Change } from 'firebase-functions/v1';
import { PrivateUserData, PublicUserData } from 'types/user';
import { updatePublicUserData } from '../src/user/index';
import { db } from '../src/index';

/*
    Shifted to making individual document snapshots for before and after
    https://h-malik144.medium.com/jest-testing-for-firebase-functions-a51ce1094d38
    https://firebase.google.com/docs/functions/local-emulator#set_up_admin_credentials_optional
    Set the env variable for project name
    download the service account name, add to your gitignore
*/

const testEnv = functions({ projectId: "maet-pickup-dev"}, 'service-account.json');

// declare tests
describe('Firebase functions testing', () => {
    // declare wrapped as a scheduled firebase function that has not been invoked yet
    let wrappedOnWrite: WrappedScheduledFunction | WrappedFunction<Change<DocumentSnapshot>, void>;

    beforeAll(() => {
        // wrap the firebase function, ready to be invoked
        wrappedOnWrite = testEnv.wrap(updatePublicUserData);
    });

    // declare the data to test
    const privateUserData: PrivateUserData = {
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

    const publicUserData: PublicUserData = {
        id: privateUserData.id,
        firstName: privateUserData.firstName,
        lastName: privateUserData.lastName,
        count: privateUserData.count,
        image: privateUserData.image,
    };

    const privatePath = `private-user-data/${privateUserData.id}`;
    const publicPath = `public-user-data/${publicUserData.id}`;

    // run the test
    test('Testing onWrite function', async () => {
        // create the example snapshots
        // we can change the inputted data for before and after depending on if we want the data to change at all.
        const changeDoc: Change<DocumentSnapshot> = {
            before: testEnv.firestore.makeDocumentSnapshot({}, privatePath),
            after: testEnv.firestore.makeDocumentSnapshot(privateUserData, privatePath),
        };

        // call firebase function with the changes inputted to the function
        await wrappedOnWrite(changeDoc);

        const after = await db.doc(publicPath).get();

        // expect it to be the same data object, which is what toStrictEqual checks
        expect(after.data()).toStrictEqual(publicUserData);
    });

    afterAll(async () => {
        // cleanup the private data, any env variables and firebase apps
        testEnv.cleanup();

        // delete firebase function data for onWrite function
        await db.doc(publicPath).delete();
    });
});

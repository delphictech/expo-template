import * as functions from 'firebase-functions-test';
import { db, makeDetailedData } from '../src/index';
import 'jest';
import { DocumentSnapshot } from 'firebase-functions/v1/firestore';
import { WrappedFunction, WrappedScheduledFunction } from 'firebase-functions-test/lib/main';
import { Change } from 'firebase-functions/v1';

/*
    Shifted to making individual document snapshots for before and after
    https://h-malik144.medium.com/jest-testing-for-firebase-functions-a51ce1094d38
*/

// import * as admin from 'firebase-admin';
const projectId = 'maet-pickup-dev';

// Setup for offline
// process.env.FIRESTORE_EMULATOR_HOST = process.env.localHost;
// End Setup for offline

// admin.initializeApp({ projectId });

// const db = admin.firestore();


const testEnv = functions({ projectId: projectId }, './service-account.json');

// declare tests 
describe("Firebase functions testing", () => {
    let wrapped: WrappedScheduledFunction | WrappedFunction<Change<DocumentSnapshot>, void>;

    beforeAll(() => {
        wrapped = testEnv.wrap(makeDetailedData);
    });

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

    test("Testing firebase function", async () => {
        const privatePath = `private-user-data/${privateUserData.uid}`;

        // 
        const changeDoc: Change<DocumentSnapshot> = {
            before: testEnv.firestore.makeDocumentSnapshot(privateUserData, privatePath),
            after: testEnv.firestore.makeDocumentSnapshot(privateUserData, privatePath),
        };
        // (privateUserData, privatePath);

        await wrapped(changeDoc);

        const publicPath = `public-user-data/${privateUserData.uid}`;
        const after = await db.doc(publicPath).get();

        expect(after.data()).toStrictEqual(publicUserData);

    });

    afterAll(() => {
        // cleanup the testing data
        testEnv.cleanup();
    });

});

/*
// let wrapped: any;
describe('working tests', () => {
    let privateRefID: string;
    beforeAll(() => {
        // let wrapped = testEnv.wrap(makeDetailedData);
        // wrapped = testENV.wrap(myFunction.makeDetailedData);
    });

    // afterEach(() => {
    //     db.collection('private-user-data').doc(privateRefID).delete();
    //     db.collection('public-user-data').doc(privateRefID).delete();
    // });

    test('Add new collection doc', async () => {
        // const path = 'public-user-data/';
        const inputToDB = {
            name: 'seth',
            count: '7',
            image: 'dasadsadaawd',
            email: 'seth@email',
            emailVerified: true,
            phone: 1234566,
        };

        const expectedValue = {
            name: inputToDB.name,
            count: inputToDB.count,
            image: inputToDB.image,
        };

        console.log(expectedValue);
        

        // const snap = await testENV.firestore.makeDocumentSnapshot(inputToDB, 'private-user-data');

        // const snap = db.collection('private-user-data').doc().set(inputToDB);

        const privateRef = db.collection('private-user-data').doc();
        await privateRef.set(inputToDB);


        // await wrapped(snap);

        privateRefID = privateRef.id;

        console.log(privateRefID);

        // await privateRef.set(inputToDB);

        // console.log('snap', snap);

        const publicRef = db.collection('public-user-data').doc(privateRefID);

        // console.log(publicRef);
        await new Promise((r) => setTimeout(r, 5000));

        const publicDoc = await publicRef.get();

        console.log(publicDoc.data());

        expect(publicDoc.data()).toEqual(expectedValue);
    }, 8000);

    test('Sample ', () => {
        expect(1).toBe(1);
    });
});

*/

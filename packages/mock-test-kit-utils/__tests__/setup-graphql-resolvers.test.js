'use strict'

const path = require('path');
const {setupGraphql, createResolver} = require('../lib/setup-graphql-resolvers');

describe('Setup GraphQL Resolvers', () => {
    it('should return graphQL resolver object', async () => {

        const graphQLResolvers = setupGraphql('mock-api', path.join(__dirname, './routes/data'));

        expect(graphQLResolvers).toEqual({
            Query: {
                member: expect.any(Function),
                memberCard: expect.any(Function)
            }
        });
    });

    describe('createResolver', () => {
        const resolvers = {
            Query: {
                member: [
                    {
                        request: {
                            params: {}
                        }, response: {
                            body: {}
                        }
                    }
                ],
                memberCard: [
                    {
                        request: {
                            params: {
                                memberCardUuid: '920A2371-3561-45AC-A2AF-5AF6ABEFB13D'
                            }
                        },
                        response: {
                            body: {}
                        }
                    },
                    {
                        request: {
                            params: {
                                memberCardUuid: 'EF025F63-63F1-47F3-BE34-71DC09C8A679'
                            }
                        },
                        response: {
                            error: {
                                message: 'Not happening.'
                            }
                        }
                    },
                    {
                        request: {
                            params: {
                                memberCardUuid: 'F8E83C1A-F82C-4EB0-A8B7-F80ADB4048C2'
                            }
                        },
                        response: [
                            {
                                error: {
                                    message: 'There was a conflict.'
                                }
                            },
                            {
                                body: {}
                            }
                        ]
                    },
                ]
            }
        }
        beforeEach(() => {
            jest.clearAllMocks();
        });

        it('should match params', async () => {
            const resolver = createResolver(resolvers, 'Query', 'memberCard');
            const response = await resolver(null, {memberCardUuid: '920A2371-3561-45AC-A2AF-5AF6ABEFB13D'});

            expect(response).toEqual({});
        });

        it('should not match params', async () => {
            const resolver = createResolver(resolvers, 'Query', 'memberCard');

            try {
                await resolver(null, {memberCardUuid: '3376922A-E8FA-465F-A54F-2A6EEE0B4341'});
            } catch (error) {
                expect(error.message).toEqual('Not Found');
            }
        });

        it('should match params and throw error', async () => {
            const resolver = createResolver(resolvers, 'Query', 'memberCard');

            try {
                await resolver(null, {memberCardUuid: 'EF025F63-63F1-47F3-BE34-71DC09C8A679'});
            } catch (error) {
                expect(error.message).toEqual('Not happening.');
            }
        });

        it('should match params and return conflict, success, conflict, success', async () => {
            const resolver = createResolver(resolvers, 'Query', 'memberCard');
            let response;

            try {
                await resolver(null, {memberCardUuid: 'F8E83C1A-F82C-4EB0-A8B7-F80ADB4048C2'});
            } catch (error) {
                expect(error.message).toEqual('Conflict.');
            }

            response = await resolver(null, {memberCardUuid: 'F8E83C1A-F82C-4EB0-A8B7-F80ADB4048C2'});
            expect(response).toEqual({});

            try {
                await resolver(null, {memberCardUuid: 'F8E83C1A-F82C-4EB0-A8B7-F80ADB4048C2'});
            } catch (error) {
                expect(error.message).toEqual('Conflict.');
            }

            response = await resolver(null, {memberCardUuid: 'F8E83C1A-F82C-4EB0-A8B7-F80ADB4048C2'});
            expect(response).toEqual({});
        });
    });
});

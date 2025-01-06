import { IncomingMessage } from "http"
import { getRequestBody } from "../../../app/server_app/utils/Utils"

describe('Utils test suit', () => {

    const requestMock = {
        on: jest.fn()
    }

    const someObj = {
        name: 'SomeName',
        age: 30,
        city: 'Paris'
    }

    const someObjAsString = JSON.stringify(someObj)

    it('should return object for valid JSON', async () => {

        requestMock.on.mockImplementation((event, cb) => {
            if(event === 'data'){
                cb(someObjAsString)
            }else{
                cb()
            }
        })

        const actual = await getRequestBody(
            requestMock as any as IncomingMessage
        )

        expect(actual).toEqual(someObj)

    })

    it('should throw error for invalid JSON', async () => {
        requestMock.on.mockImplementation((event, cb) => {
            if(event === 'data'){
                cb('a' + someObjAsString)
            }else{
                cb()
            }
        })

        await expect(getRequestBody(requestMock as any)).rejects.
            toThrowErrorMatchingSnapshot()
    })

    it('should throw error for unexpected error', async () => {
        const someError = new Error('Something went wrong')
        requestMock.on.mockImplementation((event, cb) => {
            if(event === 'error'){
                cb(someError)
            }
        })
        await expect(getRequestBody(requestMock as any)).rejects.
        toThrowErrorMatchingSnapshot()
    })
})
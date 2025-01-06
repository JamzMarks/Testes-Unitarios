import { DataBase } from "../../../app/server_app/data/DataBase"
import * as IdGenerator from "../../../app/server_app/data/IdGenerator";

type someTypeWithId = {
    id: string,
    name: string,
    color: string
}

describe('Database test suit', () => {
    let sut: DataBase<someTypeWithId>;
    const fakeId = '1234'

    const someObject = {
        id: "",
        name: 'SomeName',
        color: 'blue'
    }
    const someObject2 = {
        id: "",
        name: 'SomeName2',
        color: 'blue'
    }

    beforeEach(() => {
        sut = new DataBase<someTypeWithId>();
        jest.spyOn(IdGenerator, 'generateRandomId')
            .mockReturnValue(fakeId)
    })


    it('Should return id after insert', async () => {
        const actual = await sut.insert({
            id: ''
        } as any)
        expect(actual).toBe(fakeId)
    })

    it('Should return Object by searching for id', async () => {
        const id = await sut.insert(someObject)
        const actual = await sut.getBy('id', id)
        expect(actual).toBe(someObject)
    })

    it('Should find all elements with the same property', async () => {
        await sut.insert(someObject);
        await sut.insert(someObject2);
        const expected = [someObject, someObject2]

        const actual = await sut.findAllBy('color', 'blue')
        expect(actual).toEqual(expected)
    })

    it('Should update a value by the key ', async () => {
        const id = await sut.insert(someObject);
        
        const expectColor = 'red';
        await sut.update(id, 'color', expectColor);
        const object = await sut.getBy('id', id)
        const actualColor = object?.color
        expect(actualColor).toBe(expectColor)
    })
    it('Should delete a value by the id ', async () => {
        const id = await sut.insert(someObject);
        await sut.delete(id);

        const actual = await sut.getBy('id', id)
        expect(actual).toBeUndefined();
    })
    it('Should find all elements', async () => {
        await sut.insert(someObject);
        await sut.insert(someObject2);
        const expected = [someObject, someObject2]
        

        const actual = await sut.getAllElements();
        expect(actual).toEqual(expected);
    })
})
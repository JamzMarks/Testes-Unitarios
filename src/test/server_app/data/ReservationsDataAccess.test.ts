import { ReservationsDataAccess } from "../../../app/server_app/data/ReservationsDataAccess"
import { Reservation } from "../../../app/server_app/model/ReservationModel"
import { DataBase } from "../../../app/server_app/data/DataBase"
import * as IdGenerator from '../../../app/server_app/data/IdGenerator';

const insertMock = jest.fn();
const updateMock = jest.fn();
const deletMock = jest.fn();
const getByMock = jest.fn();
const getAllElementsMock = jest.fn();

jest.mock('../../../app/server_app/data/DataBase', () => {
    return {
        DataBase : jest.fn().mockImplementation(() => {
            return {
                insert: insertMock,
                update: updateMock,
                delete: deletMock,
                getBy: getByMock,
                getAllElements: getAllElementsMock
            }
        })
    }
})

describe('ReservationDataAccess test suit', () => {
    let sut: ReservationsDataAccess

    const someReservation: Reservation = {
        id: '',
        room: 'someRoom',
        user: 'someUser',
        startDate: 'someDate',
        endDate: 'someEndDate'
    }

    const someId = '1234'

    beforeEach(() => {
        sut = new ReservationsDataAccess()
        expect(DataBase).toHaveBeenCalledTimes(1)
        jest.spyOn(IdGenerator, 'generateRandomId').mockReturnValueOnce(someId);
    })

    afterEach(() => {
        jest.clearAllMocks();
        someReservation.id = '';
    })

    it('should return the id of newly created reservation', async () => {
        insertMock.mockResolvedValueOnce(someId)

        const actual  = await sut.createReservation(someReservation)

        expect(actual ).toEqual(someId);
        expect(insertMock).toHaveBeenCalledWith(someReservation)
    })
    it('should update value of a reservation by id', async () => {
        updateMock.mockResolvedValueOnce(someId)

        await sut.updateReservation(someId, 'room', 'AnotherRoom')

        expect(updateMock).toHaveBeenCalledWith(
            someId, 'room', 'AnotherRoom'
        );
    })

    it('should delete a reservation by ID', async () => {
        deletMock.mockResolvedValueOnce(someId)

        await sut.deleteReservation(someId);
        expect(deletMock).toHaveBeenCalledWith(someId)

    });

    it('should return a reservation by ID', async () => {
        getByMock.mockResolvedValueOnce(someReservation)

        const actual = await sut.getReservation(someId)
        expect(actual).toEqual(someReservation)
        expect(getByMock).toHaveBeenCalledWith('id', someId)
    });

    it('should return all reservations', async () => {
        getAllElementsMock.mockResolvedValueOnce([someReservation, someReservation])

        const actual = await sut.getAllReservations()
        expect(actual).toEqual([someReservation, someReservation])
        expect(getAllElementsMock).toHaveBeenCalledTimes(1)
    });

    


})
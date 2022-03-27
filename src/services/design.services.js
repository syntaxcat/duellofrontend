import { storageService } from './storage.service.js'
import { utilService } from './util.service.js'

export const designService = {
    query,
}

const DESIGN_KEY = 'designDB'

async function query() {
    return storageService.query(DESIGN_KEY)
}

_createDesignlist()

async function _createDesignlist() {
    var design = await storageService.query(DESIGN_KEY)
    if (!design || !design.length) {
        design = {
            imgs: [
                {
                    _id: utilService.makeId(),
                    url: 'https://res.cloudinary.com/dtseyauom/image/upload/v1648384795/fabian-quintero-UWQP2mh5YJI-unsplash_gftphd.jpg'
                },
                {
                    _id: utilService.makeId(),
                    url: 'https://res.cloudinary.com/dtseyauom/image/upload/v1648384788/garrett-parker-DlkF4-dbCOU-unsplash_fsgk4u.jpg'
                },
                {
                    _id: utilService.makeId(),
                    url: 'https://res.cloudinary.com/dtseyauom/image/upload/v1648384785/cristina-gottardi-CSpjU6hYo_0-unsplash_iyf4kk.jpg'
                },
                {
                    _id: utilService.makeId(),
                    url: 'https://res.cloudinary.com/dtseyauom/image/upload/v1648384786/samantha-gades-BlIhVfXbi9s-unsplash_x6l6ky.jpg'
                },
                {
                    _id: utilService.makeId(),
                    url: 'https://res.cloudinary.com/dtseyauom/image/upload/v1648384785/taylor-simpson-iwDwf4C80Io-unsplash_dlvqa0.jpg'
                },
                // {
                //     _id: utilService.makeId(),
                //     url: 'https://res.cloudinary.com/dtseyauom/image/upload/v1648384785/andreas-kind-bUhzlj3gGso-unsplash_wqxdr6.jpg'
                // },
                {
                    _id: utilService.makeId(),
                    url: 'https://res.cloudinary.com/dtseyauom/image/upload/v1648384784/luca-micheli-ruWkmt3nU58-unsplash_nfkucz.jpg'
                },
                // {
                //     _id: utilService.makeId(),
                //     url: 'https://res.cloudinary.com/dtseyauom/image/upload/v1648384784/ian-dooley-DuBNA1QMpPA-unsplash_cfb8li.jpg'
                // },
                // {
                //     _id: utilService.makeId(),
                //     url: 'https://res.cloudinary.com/dtseyauom/image/upload/v1648384784/valery-rabchenyuk-yZUJ3HqcUdU-unsplash_ghbtvy.jpg'
                // },
                // {
                //     _id: utilService.makeId(),
                //     url: 'https://res.cloudinary.com/dtseyauom/image/upload/v1648384784/cristina-gottardi-CSpjU6hYo_0-unsplash_1_i8eqbi.jpg'
                // },

            ],
            colors: [
                {
                    id: utilService.makeId(),
                    color: '#61bd4f'
                },
                {
                    id: utilService.makeId(),
                    color: '#f2d600'
                },
                {
                    id: utilService.makeId(),
                    color: '#ff9f1a'
                },
                {
                    id: utilService.makeId(),
                    color: '#eb5a46'
                },
                {
                    id: utilService.makeId(),
                    color: '#c377e0'
                },
                {
                    id: utilService.makeId(),
                    color: '#0079bf'
                },
                {
                    id: utilService.makeId(),
                    color: '#00c2e0'
                },
                {
                    id: utilService.makeId(),
                    color: '#51e898'
                },
                {
                    id: utilService.makeId(),
                    color: '#ff78cb'
                },
                {
                    id: utilService.makeId(),
                    color: '#344563'
                },
            ]
        }
console.log('blooooop')
        storageService.post(DESIGN_KEY, design)
    }
}

// function _createImgList()
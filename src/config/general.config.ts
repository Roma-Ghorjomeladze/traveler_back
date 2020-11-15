export const generalConfig = {
    JWT_SECRET: process.env.JWT_SECRET,
}

export const whiteList = [
    '/auth/login',
    '/user/create',
    '/auth/restore-token',
]
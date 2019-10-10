export const isBookRead = async (user: any, book: any) => {
    const books = await user.returnedBooks;
    return books.some((item: any) => item.id === book.id);
};

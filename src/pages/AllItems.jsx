import React, { useState } from 'react'
import BookCard from './books/BookCard';
import { useFetchAllBooksQuery } from '../redux/features/books/booksApi';

const categories = ["All Books", "Stationary", "Special Feature Items", "Class 1-5", "Class 6-10", "11 & 12", "UG/PG", "Competitive", "Business", "Technology", "Fiction", "Horror", "Adventure"]

const AllItems = () => {
    const [selectedCategory, setSelectedCategory] = useState("All Books");
    const [searchQuery, setSearchQuery] = useState("");
    const { data: books = [], isLoading, isError } = useFetchAllBooksQuery();

    // Filter books based on category and search query
    const filteredBooks = books.filter(book => {
        const matchesCategory = selectedCategory === "All Books" || book.category.toLowerCase() === selectedCategory.toLowerCase();
        const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            book.author.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    if (isLoading) {
        return <div className="min-h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
        </div>
    }

    if (isError) {
        return <div className="min-h-screen flex items-center justify-center">
            <p className="text-red-500">Error loading books. Please try again later.</p>
        </div>
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold mb-8">All Books Collection</h1>
            
            <div className="flex flex-col md:flex-row gap-4 mb-8">
                {/* Category Filter */}
                <select
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    value={selectedCategory}
                    className="border bg-[#EAEAEA] border-gray-300 rounded-md px-4 py-2 focus:outline-none"
                >
                    {categories.map((category, index) => (
                        <option key={index} value={category}>{category}</option>
                    ))}
                </select>

                {/* Search Input */}
                <input
                    type="text"
                    placeholder="Search by title or author..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none flex-grow md:max-w-md"
                />
            </div>

            {/* Books Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredBooks.map((book, index) => (
                    <BookCard key={index} book={book} />
                ))}
            </div>

            {/* No Results Message */}
            {filteredBooks.length === 0 && (
                <div className="text-center py-10">
                    <p className="text-gray-500">No books found matching your criteria.</p>
                </div>
            )}
        </div>
    )
}

export default AllItems 
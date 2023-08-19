package com.PTIT.BookStore.service;

import com.PTIT.BookStore.entities.Book;
import com.PTIT.BookStore.entities.Image;
import com.PTIT.BookStore.exception.BookNotFoundException;
import com.PTIT.BookStore.repository.BookRepository;
import org.apache.commons.io.FileUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.io.OutputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;

@Service
public class BookServiceImpl implements BookService{

    @Autowired
    private BookRepository bookRepository;

    private static final Path CURRENT_FOLDER = Paths.get(System.getProperty("user.dir"));

    @Override
    public Book fetchBookById(int id) throws BookNotFoundException {
        Optional<Book> bookDB = bookRepository.findById(id);

        if(!bookDB.isPresent()) {
            throw new BookNotFoundException("Book Not Found By ID: " + id);
        }

        return bookDB.get();
    }

    @Override
    public List<Image> saveImage(String title, MultipartFile[] images) throws IOException {
        List<Image> imageList = new ArrayList<>();
        Path staticPath = Paths.get("static");
        Path imagePath = Paths.get("images");
        Path folderName = Paths.get(title);

        if (!Files.exists(CURRENT_FOLDER.resolve(staticPath).resolve(imagePath).resolve(folderName))) {

            Files.createDirectories(CURRENT_FOLDER.resolve(staticPath).resolve(imagePath).resolve(folderName));
        }

        for(int i = 0;i < images.length;i++) {
            Path file = CURRENT_FOLDER.resolve(staticPath)
                    .resolve(imagePath).resolve(folderName).resolve(images[i].getOriginalFilename());

            try (OutputStream os = Files.newOutputStream(file)) {
                os.write(images[i].getBytes());
            }
            imageList.add(new Image(folderName.resolve(images[i].getOriginalFilename()).toString()));
        }

        return imageList;
    }

    @Override
    public List<Image> updateImage(String newTitle, String oldTitle, MultipartFile[] images) throws IOException {
        List<Image> imageList = new ArrayList<>();
        Path staticPath = Paths.get("static");
        Path imagePath = Paths.get("images");
        Path currentFolderName = Paths.get(oldTitle);
        Path newFolderName = Paths.get(newTitle);
        String pathDirectory = CURRENT_FOLDER.resolve(staticPath).resolve(imagePath).resolve(currentFolderName).toString();
        FileUtils.deleteDirectory(new File(pathDirectory));
        if (!Files.exists(CURRENT_FOLDER.resolve(staticPath).resolve(imagePath).resolve(newFolderName))) {
            Files.createDirectories(CURRENT_FOLDER.resolve(staticPath).resolve(imagePath).resolve(newFolderName));
        }
        for(int i = 0;i < images.length;i++) {
            Path file = CURRENT_FOLDER.resolve(staticPath)
                    .resolve(imagePath).resolve(newFolderName).resolve(images[i].getOriginalFilename());

            try (OutputStream os = Files.newOutputStream(file)) {
                os.write(images[i].getBytes());
            }
            imageList.add(new Image(newFolderName.resolve(images[i].getOriginalFilename()).toString()));
        }
        return imageList;
    }

    @Override
    public void deleteImage(String title) throws IOException {
        Path staticPath = Paths.get("static");
        Path imagePath = Paths.get("images");
        Path folderName = Paths.get(title);

        String pathDirectory = CURRENT_FOLDER.resolve(staticPath).resolve(imagePath).resolve(folderName).toString();
        FileUtils.deleteDirectory(new File(pathDirectory));
    }

    @Override
    public List<Book> fetchAllBook(String title) {
        if(title != null) {
            return bookRepository.findByTitleContaining(title);
        }
        return bookRepository.findAll();
    }

    @Override
    public List<Book> fetchAllBookByTypeBook(String typeBook) {
        if(typeBook != null) {
            return bookRepository.findByTypeBook(typeBook);
        }
        return bookRepository.findAll();
    }

    @Override
    public Book saveBook(Book book) {
        return bookRepository.save(book);
    }

    @Override
    public Book updateBook(int bookId, Book book) throws BookNotFoundException {
        Optional<Book> bookTmp = bookRepository.findById(bookId);
        if(!bookTmp.isPresent()) {
            throw new BookNotFoundException("Book not available!!!");
        }
        Book bookDB = bookTmp.get();
        if(Objects.nonNull(book.getTitle()) && !"".equalsIgnoreCase(book.getTitle())) {
            bookDB.setTitle(book.getTitle());
        }

        if(Objects.nonNull(book.getAuthor()) && !"".equalsIgnoreCase(book.getAuthor())) {
            bookDB.setAuthor(book.getAuthor());
        }

        if(Objects.nonNull(book.getDescription()) && !"".equalsIgnoreCase(book.getDescription())) {
            bookDB.setDescription(book.getDescription());
        }

        if(Objects.nonNull(book.getTitle()) && !"".equalsIgnoreCase(book.getTitle())) {
            bookDB.setTitle(book.getTitle());
        }

        if(Objects.nonNull(book.getDateRelease()) && !"".equalsIgnoreCase(book.getDateRelease())) {
            bookDB.setDateRelease(book.getDateRelease());
        }

        if(Objects.nonNull(book.getTotalPage()) && book.getTotalPage() > 0) {
            bookDB.setTotalPage(book.getTotalPage());
        }

        if(Objects.nonNull(book.getTypeBook()) && !"".equalsIgnoreCase(book.getTypeBook())) {
            bookDB.setTypeBook(book.getTypeBook());
        }

        if(Objects.nonNull(book.getPrice()) && book.getTotalPage() > 0) {
            bookDB.setPrice(book.getPrice());
        }

        if(Objects.nonNull(book.getBookImages()) && book.getBookImages().size() > 0) {
            bookDB.setBookImages(book.getBookImages());
        }

        return bookRepository.save(bookDB);
    }

    @Override
    public void deleteBookById(int bookId) throws BookNotFoundException {
        Optional<Book> book = bookRepository.findById(bookId);
        if(!book.isPresent()) {
            throw new BookNotFoundException("Book not available!!!");
        }

        bookRepository.deleteById(bookId);
    }

    @Override
    public boolean isTitleUnique(String title) {
        Book bookByTitle = bookRepository.findByTitle(title);
        return bookByTitle == null;
    }
}

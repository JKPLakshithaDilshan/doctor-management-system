package com.example.doctormanagement.util;

import java.io.*;
import java.nio.file.*;
import java.util.*;

public class FileHandler {
    private static final String FILE_PATH = "src/main/resources/data/doctors.txt";

    public static List<String> readFromFile() {
        List<String> lines = new ArrayList<>();
        try {
            File file = new File(FILE_PATH);
            if (!file.exists()) {
                file.createNewFile();
                return lines;
            }
            lines = Files.readAllLines(Paths.get(FILE_PATH));
        } catch (IOException e) {
            e.printStackTrace();
        }
        return lines;
    }

    public static void writeToFile(List<String> lines) {
        try {
            Files.write(Paths.get(FILE_PATH), lines);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}


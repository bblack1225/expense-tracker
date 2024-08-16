package com.blake.expensetrackerbackend.utils;

import com.blake.expensetrackerbackend.exception.ServiceException;

import java.time.LocalDate;
import java.time.format.DateTimeParseException;

public class DateUtil {
    private DateUtil() {
    }
    public static LocalDate parseDate(String date) {
        try {
            return LocalDate.parse(date);
        } catch (DateTimeParseException e) {
            throw new ServiceException("Invalid date format");
        }
    }
}

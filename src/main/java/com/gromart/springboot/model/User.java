package com.gromart.springboot.model;
import java.math.BigDecimal;
import java.util.Date;


public class User {
    private String userId;
    //@NotBlank (message = "firstName Cannot be Null")
    //@Pattern(regexp = "[A-Z][a-z]*", message = "enter valid name")
    private String firstName;

    //@Pattern(regexp = "[A-Z]+([ '-][a-zA-Z]+)*", message = "enter valid name")
    private String lastName;

    //@NotBlank(message = "LastName Cannot be Null")
    //@Pattern(regexp = "/^(?=.{6,8}$)(?![_.])[a-zA-Z0-9._]+(?<![_.])$/", message = "Username must be 6 to 8 in alphanumeric and without any symbol")
    private String userName;

    //@NotBlank (message = "email Cannot be Null")
    //@Pattern(regexp = "/^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$/", message = "email get wrong. ex (xxx.xxx@xxx.com)")
    private String email;

    //@NotBlank (message = "Phone Number Cannot be Null")
    //@Pattern(regexp = "/^(^\\+62|62|^08)(\\d{3,4}-?){2}\\d{3,4}$/", message = "Phone number must in Indonesia type (ex: 628113912109 or 08134455555)")
    private String phoneNumber;

    //@NotBlank (message = "Password Cannot be Null")
    //@Pattern(regexp = "/^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6}$/", message = "Password must be 6 in alphanumeric and at least 1 uppercase letter")
    private String password;

    //@NotBlank (message = "Role Cannot be Null")
    private String role;

//    @NotNull (message = "creditLimit Cannot be Null")
//    @PositiveOrZero
    private BigDecimal creditLimit;

//    @NotNull (message = "invoiceLimit Cannot be Null")
//    @PositiveOrZero
    private int invoiceLimit;
    private String createdBy;
    private Date createdDate;
    private String updatedBy;
    private Date updatedDate;

    public User() {

    }

    public User(String userId,
                String firstName,
                String lastName,
                BigDecimal creditLimit,
                int invoiceLimit)
    {
        this.userId = userId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.creditLimit = creditLimit;
        this.invoiceLimit = invoiceLimit;
    }

    public User(String userId,
                String firstName,
                String lastName,
                String userName,
                String email,
                String phoneNumber,
                BigDecimal creditLimit,
                int invoiceLimit,
                String createdBy,
                Date createdDate,
                String updatedBy,
                Date updatedDate) {
        this.userId = userId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.userName = userName;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.creditLimit = creditLimit;
        this.invoiceLimit = invoiceLimit;
        this.createdBy = createdBy;
        this.createdDate = createdDate;
        this.updatedBy = updatedBy;
        this.updatedDate = updatedDate;
    }

    public User(
            String userId,
            String firstName,
            String lastName,
            String email,
            String phoneNumber,
            String role,
            BigDecimal creditLimit,
            int invoiceLimit) {
        this.userId = userId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.role = role;
        this.creditLimit = creditLimit;
        this.invoiceLimit = invoiceLimit;
    }

    public User(
            String userId,
            String firstName,
            String lastName,
            String userName,
            String email,
            String phoneNumber,
            String password,
            String role,
            BigDecimal creditLimit,
            int invoiceLimit,
            String createdBy,
            Date createdDate,
            String updatedBy,
            Date updatedDate)
    {
        this.userId = userId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.userName = userName;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.password = password;
        this.role = role;
        this.creditLimit = creditLimit;
        this.invoiceLimit = invoiceLimit;
        this.createdBy = createdBy;
        this.createdDate = createdDate;
        this.updatedBy = updatedBy;
        this.updatedDate = updatedDate;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public BigDecimal getCreditLimit() {
        return creditLimit;
    }

    public void setCreditLimit(BigDecimal creditLimit) {
        this.creditLimit = creditLimit;
    }

    public int getInvoiceLimit() {
        return invoiceLimit;
    }

    public void setInvoiceLimit(int invoiceLimit) {
        this.invoiceLimit = invoiceLimit;
    }

    public String getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }

    public Date getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(Date createdDate) {
        this.createdDate = createdDate;
    }

    public String getUpdatedBy() {
        return updatedBy;
    }

    public void setUpdatedBy(String updatedBy) {
        this.updatedBy = updatedBy;
    }

    public Date getUpdatedDate() {
        return updatedDate;
    }

    public void setUpdatedDate(Date updatedDate) {
        this.updatedDate = updatedDate;
    }
}

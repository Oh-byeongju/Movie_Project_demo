//23-01-09 ~ 23-01-10 id 중복 확인 및 mysql 점검(오병주)
package com.movie.Spring_backend.entity;

import lombok.*;
import javax.persistence.*;
import java.sql.Date;

// 빌더패턴을 사용한 entity 파일
@Entity
@Getter
@NoArgsConstructor
@Table(name = "member")     // 디비의 테이블명과 클래스 명이 다를 경우
public class MemberEntity {

    @Id
    @Column(nullable = false, length = 20)
    private String uid;

    @Column(nullable = false)
    private String upw;

    @Column(nullable = false, length = 20)
    private String uname;

    @Column(nullable = false, length = 50)
    private String uemail;

    @Column(nullable = false, length = 20)
    private String utel;

    @Column(nullable = false, length = 50)
    private String uaddr;

    @Column(nullable = false, length = 50)
    private String uaddrsecond;

    @Column(nullable = false)
    private Date ubirth;

    @Column(nullable = false)
    private Date ujoindate;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private Authority uauthority;

    @Builder
    public MemberEntity(String uid, String upw, String uname, String uemail, String utel,
                        String uaddr, String uaddrsecond, Date ubirth, Date ujoindate, Authority uauthority) {
        this.uid = uid;
        this.upw = upw;
        this.uname = uname;
        this.uemail = uemail;
        this.utel = utel;
        this.uaddr = uaddr;
        this.uaddrsecond = uaddrsecond;
        this.ubirth = ubirth;
        this.ujoindate = ujoindate;
        this.uauthority = uauthority;
    }
}

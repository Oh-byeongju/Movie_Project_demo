// 23-01-13 아이디 중복 검사 기능구현(오병주)
package com.movie.Spring_backend.repository;

import com.movie.Spring_backend.entity.MemberEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MemberRepository extends JpaRepository<MemberEntity, Long> {
    // 아이디 중복 검사를 위한 select
    boolean existsByUid(String id);
}

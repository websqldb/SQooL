# Tutorial

해당 강의자료는 제주코딩베이스캠프의 허락을 구하고 [생애 첫 SQL With 제코베의 강의자료](https://inf.run/gR5i)를 수정한 것입니다.

해당 Tutorial은 Web SQL(`SQLite`) 기준으로 작성되었습니다. 더 알고 싶은 문법이 있을 경우 `SQLite`로 검색하여 공부하세요. 해당 자료로 기초를 익히시기에는 충분하지만 MySQL이나 MSSQL과는 다른 문법도 있으니 이점에 유념해주세요.

해당 웹페이지를 만든 기술인 Web SQL은 추후 [작동하지 않을 수](https://developer.chrome.com/blog/deprecating-web-sql/) 있습니다. 작동하지 않게 되면 `paul-lab@naver.com`으로 제보해주세요. 대체 기술을 사용하여 다시 만들도록 하겠습니다.

# 1. 데이터베이스란?

## 1.1 공부하시는 방법

`Try it`과 `Tutorial` 2개의 페이지를 각각 창에 띄어놓으시고 코드를 복사 붙여넣기 하면서 보세요. 가능하면 이 챕터(이론)를 건너뛰시고, 나중에 궁금하실 경우에 보세요.

복잡한 구문은 아래와 같이 주석을 달아주세요. 그리고 가능하다면 손으로 3~4번 반복해서 써보시길 권해드립니다.

```sql
-- 해당 구문은 전체 학생 정보를 조회합니다.
SELECT * FROM student;
```

```sql
-- 해당 구문은 전체 학생 정보를 조회합니다.
SELECT * FROM student --WHERE 학번 > 20190002;
```

```sql
/*
여러 줄 주석입니다.
SELECT 학번 FROM student;
*/
SELECT * FROM student;
```

## 1.2 DB

데이터베이스(영어: database, DB)는 여러 사람이 공유하여 사용할 목적으로 체계화해 통합, 관리하는 데이터의 집합이다. 작성된 목록으로써 여러 응용 시스템들의 통합된 정보들을 저장하여 운영할 수 있는 공용 데이터들의 묶음이다. - Wikidipia

이렇게 기억해주세요! **"데이터를 저장하는 공간!"**

## 1.3 DB, RDB, DBMS, RDBMS

-   DB → DBMS
-   RDB → RDBMS

RDBMS(stands for Relational Database Management System)는 DB를 관리하는 시스템입니다. TOP3 오픈소스 RDBMS는 MySQL, PostgreSQL, SQLite입니다. 오픈소스가 아닌 것에서는 Oracle이 독보적입니다.

## 1.4 관계형 데이터베이스 구성 요소

이번 챕터부터는 `2. 기본 구문 실습`을 먼저 해보고 보시기를 권해드립니다.

-   TABLE(행, 열), VIEW(데이터를 선택하여 만든 가상의 부분 집합), INDEX(주소), SEQUENCE(시퀀스, 고유번호 자동생성), SYNONYM(시노임, 객체의 별칭) 등의 객체로 구성
-   ENTITY, RELATIONE들의 집합

![출처 : 제주코딩베이스캠프 SQL 강좌](../Untitled.png)

-   튜플(Tuple)은 테이블의 행입니다.
-   속성(Attribute)은 HTML로 따지자면 Table Heading 입니다. 여기서는 학번, 이름, 주소, 전화번호가 속성이죠.
-   도메인(Domain)은 하나의 속성에서 취할 수 있는 값의 범위를 말합니다. 예를 들어 위에서는 신청 과목에서 전체 과목의 범위를 얘기합니다.
-   차수(Degree)는 속성의 개수입니다. 학생 릴레이션에서는 학번, 이름, 주소, 전화번호이니 총 4개가 될 것입니다.
-   기수(Cardinality)는 튜플의 개수입니다. 위에서는 어트리뷰트를 제외하고 총 5개의 튜플이 존재합니다.

### 1.4.1 키의 개념 및 종류

-   기본키는 메인으로 사용할 키를 말합니다. 고유한(유일한) 주민등록번호나, 계좌번호, 전화번호 등을 기본키로 사용할 수 있습니다. 기본키는 NULL을 사용할 수 없습니다.
-   후보키는 기본키를 제외하고 고유한 키들을 말합니다.
-   외래키는 관계되어 있는 테이블에서 참고하고 있는 키를 얘기합니다. 여기서 학생 릴레이션과 수강신청 과목 릴레이션은 서로 학번으로 연결되어 있죠.

### 1.4.2 데이터베이스의 종류

-   계층형 데이터베이스(1:N)
-   망형 데이터베이스(N:M)
-   관계형 데이터베이스(단순한 표 형태의 상호 관계, 1:1, 1:N, N:M관계 표현)
-   객체 지향형 데이터베이스

## 1.5 SQL

SQL(Structured Query Language)은 스토리지 언어의 표준입니다. 여러분이 만약 MySQL, MsSQL, Oracle, Postgres 등의 DB를 사용하여 어떤 프로젝트를 한다면 SQL을 다루실 수 있어야 합니다.

하지만 대부분의 강좌들이 '설치'부터 SQL 강의를 시작하는데, 설치하다가 지치시는 분들이 많으십니다. 이 수업은 본질에 집중합니다. SQL만 배워봅시다. 그렇다고 이론을 전혀 안하는 것은 아니고, 가장 마지막 챕터에서 다뤄보도록 하겠습니다.

```sql
SELECT * FROM student;
```

## 1.6 SQL 명령어의 분류

중요한 것은 굵은 글씨로 해두었으니, 충분히 숙련되도록 연습해보세요.

1. 데이터 조작어(DML) :**SELECT**, **INSERT**, **UPDATE**, **DELETE**
2. 데이터 정의어(DDL) :**CREATE DATABASE**, **CREATE TABLE**, **CREATE INDEX**, **ALTER DATABASE**, **ALTER TABLE**, **DROP TABLE**, **DROP INDEX**, RENAME, TRUNCATE
3. 데이터 제어어(DCL) : GRANT(권한 부여), REVOKE(권한 제거)
4. 트랜젝션 제어어(TCL) : COMMIT, ROLLBACK, SAVEPOINT

## 1.7 Data 분석 과정

![출처 : 제주코딩베이스캠프 데이터분석 강좌](../data.png)

-   사전에 데이터 분석 기획을 합니다.
-   1번에서 3번까지의 단계가 전체 과정에 70% ~ 80%를 차지하고 있습니다.
-   기업에 모든 데이터를 누구나 조회 가능하도록 BigQuery같은 곳에 모아두기도 합니다. 이러한 시스템이 갖춰진 회사라면 누구나 간단한 조회가 가능한 SQL 구문을 습득하실 필요가 있습니다.
-   기업에 들어가도 데이터가 없거나 쓸 수 없는 경우도 있습니다. 또는 의미없는 데이터이거나 추가 데이터가 필요할 수도 있습니다. 이 경우에는 공공데이터 포털이나 다른 기관의 데이터를 참고하여 데이터를 만들어야 합니다.
-   데이터 수집부터, 가공하는 것까지 SQL을 사용할 수 있습니다. 물론 분석에도 쓸 수 있지만 분석에는 더 좋은 도구들이 많죠. R, Python 등의 언어가 있고, Tableau와 같은 시각화 솔루션이 있습니다.

## 1.8 정형 데이터와 비정형 데이터

![출처 : 제주코딩베이스캠프 SQL 강좌](../Untitled%201.png)

-   정형데이터는 RDBMS에서 사용하는 테이블 안에 들어가 있는 형식이 잡혀 있는 데이터를 말합니다.
-   비정형 데이터(unstructured data, unstructured information, 비정형 정보), 비구조화 데이터, 비구조적 데이터는 미리 정의된 데이터 모델이 없거나 미리 정의된 방식으로 정리되지 않은 정보를 말한다.(출처 : WIKI)

## 1.9 CRUD란?

-   데이터베이스에서 자주 등장하는 용어이니 기억해주세요. 생성과 읽기, 갱신과 삭제를 묶어 일컫는 말입니다.

[CRUD](https://ko.wikipedia.org/wiki/CRUD)

-   Create
-   Read
-   Update
-   Delete

# 2. 기본 구문 실습

## 2.1 실습 방법

Try it 탭을 하나 더 여시고 코드를 복사하여 Run SQL 버튼을 눌러주세요.

![](../Untitled%202.png)

실습에 들어가기 전 데이터의 구조를 파악해보세요. 각각 database를 클릭하면 `Result` 창에서 table 형태로 볼 수 있습니다.

![](../Untitled%203.png)

## 2.2 SELECT

select는 데이터를 조회하거나 산술식, 함수 등을 실행할 때 사용합니다. SQL은 대소문자를 가리지 않지만, 구문에 해당되는 것은 대문자로만 적도록 하겠습니다.

`*(에스터리스크, 별표)`는 모든 항목을 다 출력할 때 사용합니다.

```sql
SELECT * FROM Student;
```

여기서 원하는 컬럼만 출력하고 싶을 때에는 아래와 같이 사용합니다.

```sql
SELECT 이름, 학과 FROM student;
```

아래와 같이 대괄호로 묶어줄 수도 있지만, 여기서는 묶어주지 않고 사용하도록 하겠습니다.

```sql
SELECT [이름], [학과] FROM student;
```

아래 보이시는 것처럼 일반 수식을 출력할 때에도 Select 구문을 사용합니다. 함수도 사용할 수 있지만 아직 함수를 배우지 않았으므로 뒤에게서 해보도록 하겠습니다.

```sql
SELECT 1+1;
SELECT (10 + 2) / 2;
```



## 2.3 DISTINCT

DISTINCT는 중복값을 제거합니다. 여기서 학과번호는 학과이름입니다. 2.5 AS 챕터에서 학과번호를 학과이름으로 바꿔주도록 하겠습니다.

```sql
SELECT DISTINCT 학과번호
FROM subject;
```

## 2.4 ORDER BY

출력 결과 정렬합니다. 아래처럼 개행을 하여도 괜찮습니다. 마지막에 세미콜론 잊지마세요.

-   오름차순 : ASC(기본, 작은 수에서 큰 수로, Ascending)
-   내림차순 : DESC(큰 수에서 작은 수로, Descending)

```sql
SELECT 학번, 학년, 이름
FROM student
ORDER BY 학년 DESC;
```

```sql
SELECT 학번, 학년, 이름
FROM student
ORDER BY 학년 ASC;
```

## 2.5 AS

별칭을 정합니다. 기존 Table의 값은 변하지 않습니다.

```sql
SELECT DISTINCT 학과번호 AS 학과이름
FROM subject;
```

```sql
SELECT 학번, 이름 AS 성명, 연락처 AS 휴대폰번호
FROM student;
```

AS 없이도 사용이 가능합니다.

```sql
SELECT 학번, 이름 성명, 연락처 휴대폰번호
FROM student;
```

## 2.6 산술연산

더하고 빼고 나누고 곱하는 것이 가능합니다.

```sql
SELECT 연도, 금액 + 500000 FROM tuition;
```

```sql
SELECT 연도, (금액 / 2) * 3 FROM tuition;
```

각각 컬럼끼리 연산도 가능합니다.

```sql
SELECT 학번 + 학번 FROM student;
```

해당 값은 0, 나누기를 하면 null로 반환합니다.

```sql
SELECT 이름 + 학과 FROM student;
```

```sql
SELECT 이름 / 학과 FROM student;
```

이어붙이려면 아래 있는 연결 연산자를 사용해야 합니다.

```sql
SELECT 이름 || '' || 학과 FROM student;
```

## 2.7 연결 연산자

Oracle에서는 ||, MsSQL은 +, MySQL은 공백으로 연결 가능. CONCAT함수는 공통으로 사용 가능합니다. 하지만 초급자 단계에서 이런 것들을 구분지어 기억하는 것은 크게 의미있지 않으니, 문법이 조금 상이하다 정도로 기억해주세요.

```sql
SELECT 학년 || ' ' || 학과 || ' ' || 학년 AS Student_Info FROM student;
```

```sql
SELECT 과목명 || ' 과목은 ' || 학과번호 || '에서 ' || 이수구분 || '과목으로 분류되어 있습니다.' FROM subject;
```

다양한 쿼리를 만들어 다른 table에서도 여러분 만에 문장을 만들어보세요.

## 2.8 논리 연산

우선순위는 NOT, AND, OR입니다. True는 1로, False는 0으로, and는 곱으로, or는 덧셈으로 이해하시면 계산이 쉽습니다. 뒤에서 나올 비교 연산자, `WHERE 조건 절`을 미리 사용하였습니다. 비교 연산자는 같다(`=`), 다르다(`!=`), 크다(`>`), 작다(`<`)를 표현하는 연산자입니다.

### 2.8.1 기본실습

```sql
SELECT 1 AND 0;
```

```sql
SELECT 1 OR 0;
```

```sql
SELECT NOT 0;
```

### 2.8.2 AND

```sql
SELECT *
FROM student
WHERE 학번 LIKE '2019%'
AND 마일리지 >= 100;
```

### 2.8.3 OR

```sql
SELECT *
FROM student
WHERE 마일리지 >= 100
AND 학번 LIKE '2019%' OR 학번 LIKE '2020%';
```

```sql
SELECT *
FROM student
WHERE 마일리지 >= 100
AND (학번 LIKE '2019%' OR 학번 LIKE '2020%');
```

### 2.8.3 NOT

```sql
SELECT *
FROM student
WHERE 마일리지 >= 100
AND NOT (학번 LIKE '2019%' OR 학번 LIKE '2020%');
```

`<>`같지 않다.(IOS 표준, SQooL에서는 돌아가지 않는 코드입니다.)

```sql
SELECT *
FROM student
WHERE 학과 <> 컴퓨터공학과;
```

## 2.9 BETWEEN 연산

A AND B : A와 B를 포함한 사이의 값

```sql
SELECT 학번, 일학년일학기
FROM grade
WHERE 일학년일학기 BETWEEN 3.0 AND 4.0;
```

```sql
SELECT 학번, 일학년일학기, 일학년이학기
FROM grade
WHERE 일학년일학기 >= 4.0 AND 일학년이학기 < 4.0;
```

## 2.10 IN 연산

IN A : A안에 값과 일치하는 값을 조회

```sql
SELECT 학번, 이름, 학과
FROM student
WHERE 학과 IN ('물리학과', '화학과');
```

## 2.11 LIKE 연산

-   LIKE '비교문자'

1. 비교 문자와 형태가 일치(%(모든 문자), \_(한 글자) 사용)
2. 대소문자를 안가림
3. `%`는 와일드카드

```sql
SELECT 학년, 이름, 지도교수
FROM student
WHERE 지도교수 LIKE '%호준';
```

만약 데이터가 일호준, 이호준, 삼호준이 있다면 모두 검색

```sql
SELECT 학년, 이름, 연락처, 지도교수
FROM student
WHERE 지도교수 LIKE '이__';
```

만약 언더바가 2개라면 위 데이터 중 이호준만 출력합니다. 이런 문자열들은 와일드카드라고 부르며 다양한 예제가 있습니다.

-   자주 쓰는 예제
    ‘-04-’이 들어가는 모든 값 (생년월일이 4월인 학생들의 데이터가 출력)

```sql
SELECT 학번, 이름, 학과, 생년월일
FROM student
WHERE 생년월일 LIKE '%-04-%';
```

아래 코드를 실습해보세요.

```sql
SELECT 학과번호, 과목명, 이수구분
FROM subject
WHERE 이수구분 LIKE '%양';
```

## 2.12 IS NULL

필드의 값이 NULL인 경우를 조회하고자 할 때 사용

-   NULL은 아예 값이 없어 알 수 없는(unknown) 값 (0이나 공백은 NULL이 아닙니다.)
-   NULL이 아닌 값을 조회하고자 한다면 NOT 연산자와 함께 `IS NOT NULL` 연산자를 사용합니다.

```sql
SELECT *
FROM scholarship
WHERE 성적장학금 IS NULL;
```

```sql
SELECT *
FROM scholarship
WHERE 성적장학금 IS NOT NULL AND 근로장학금 IS NOT NULL AND 국가장학금 IS NOT NULL;
```

## 2.13 bit 단위 논리연산자

논리 연산을 비트 단위로 합니다.

-   **AND (&)**
    대응되는 비트가 모두 1이어야 1을 반환합니다.

```sql
SELECT 1 & 0;
```

-   **OR (|)**
    대응되는 비트 중에서 하나라도 1이면 1을 반환합니다.

```sql
SELECT 1 | 0;
```

-   **XOR (^)**
    대응되는 비트가 서로 다를 때 1을 반환합니다. XOR 연산은 SQooL에서는 동작하지 않습니다.

```sql
SELECT 1 ^ 0;
```

## 2.14 WHERE

데이터를 검색, 갱신, 삭제할 때 특정 데이터에 대한 조건을 설정할 때 사용하는 구문

-   여러 연산자를 결합하여 사용 가능
-   결합 가능한 연산자의 종류 : 비교연산자(=, <, >, !=, >=, <=), SQL연산자(BETWEEN), 논리 연산자(AND, OR) 등

```sql
SELECT 학년, 이름, 연락처
FROM student
WHERE 학년 >= 3;
```

```sql
SELECT 학번, 성적장학금, 근로장학금, 국가장학금
FROM scholarship
WHERE (성적장학금 IS NOT NULL) AND (근로장학금 IS NOT NULL) AND (국가장학금 IS NOT NULL);
```

```sql
SELECT 학번, 성적장학금, 근로장학금, 국가장학금
FROM scholarship
WHERE 국가장학금 >= 1000000;
```

```sql
SELECT 교원번호, 이름, 학과, 연구실
FROM professor
WHERE 교원번호 IN ('A001', 'A002', 'A003');
```

```sql
SELECT *
FROM student
WHERE 학과='컴퓨터공학과' OR 학과='전자공학과';
```

```sql
SELECT *
FROM student
WHERE 학과 = '컴퓨터공학과' AND 학년 = 1;
```

```sql
SELECT 학번, 이름, 학과
FROM student
WHERE 학번 % 2 = 1;
```

## 2.15 INSERT

기존 테이블에 행을 삽입할 때 사용하는 구문

```sql
INSERT INTO [테이블명] ([컬럼1], [컬럼2], ...)
VALUES ([값1, 값2, ...]);
```

-   입력할 컬럼과 값은 개수와 데이터 형식이 일치해야 합니다.
-   삽입 시 지정해주지 않은 컬럼은 `null`로 들어가게 됩니다.

아래 코드를 사용한 후 다시 한 번 전체 컬럼을 조회해보세요. 나머지 값은 `null`로 들어가게 됩니다. 클릭을 3번 하면 3개의 데이터가 들어가게 됩니다.

```sql
INSERT INTO professor (이름, 학과, 이메일)
VALUES ('김물리', '물리학과', 'asdf123@sqool.ac.kr');
```

```sql
SELECT * FROM professor;
```

## 2.16 연습문제

### 문제 1번

서울에 살면서 4학년인 학생들을 구하는 쿼리문을 작성해주세요.

```sql
SELECT *
FROM student
WHERE 학년=4 AND 주소 LIKE '서울특별시%';
```

### 문제 2번

2학년1학기 성적이 null 값인 학생을 구해주세요.
비어있는 문자열과 NULL값은 다른 값입니다. 아래 주석은 오답입니다.

```sql
/* SELECT * FROM grade WHERE 2학년1학기=''; */
SELECT *
FROM grade
WHERE 2학년1학기 IS NULL;
```

### 문제 3번

컴퓨터공학과의 전필 과목을 구하는 쿼리문을 작성해주세요.

```sql
SELECT *
FROM subject
WHERE 학과번호='컴퓨터공학과' AND 이수구분='전필';
```

### 문제 4번

생일이 11월인 학생을 구하는 쿼리문을 작성해주세요.

```sql
SELECT *
FROM student
WHERE 생년월일 LIKE '%-11-%';
```

### 문제 5번

모든 2학년 학생들을 조회하되 마일리지가 큰 순으로 정렬하는 쿼리문을 작성해주세요.

```sql
SELECT *
FROM student
WHERE 학년=2 ORDER BY 마일리지 DESC;
```

## 2.17 UPDATE

데이터를 수정할 수 있습니다. 이 행위는 되돌릴 수 없습니다. WHERE 절이 탐색 조건을 충족시키는 모든 행에 대해 값을 변경합니다.
기본 형태는 다음과 같습니다.

```sql
UPDATE [테이블명]
SET [컬럼='변경할값'], [컬럼='변경할값'], ...
WHERE [조건];
```

```sql
UPDATE student
SET 이름='이호준', 학과='컴퓨터공학과'
WHERE 학번=201900001;
```

```sql
SELECT * FROM student;
```

## 2.18 DELETE

DELETE 문을 사용하면 테이블에서 행을 제거할 수 있습니다.
주의하세요. WHERE 절을 통해 조건을 주지 않으면 테이블의 모든 행이 제거됩니다. 이런일이 실무에서도 종종 발생됩니다.

```sql
DELETE FROM student WHERE 학번=201900001;
```

```sql
DELETE FROM student WHERE 학년=4;
```

```sql
SELECT * FROM student;
```

## 2.19 TOP과 LIMIT

많은 데이터 중에서 특정 개수만 출력할 수 있습니다. 방대한 데이터를 다룰 때 유용하게 사용됩니다.
`TOP`과 `LIMIT` 명령어는 동일한 기능을 하지만 DBMS마다 명령어의 지원 여부가 상이하기 때문에 알맞은 명령어를 선택해 사용하시길 바랍니다.

-   MS-SQL : `TOP`
-   MY-SQL : `LIMIT`
-   ORACLE : `ROWNUM`
    SQooL에서는 LIMIT 명령어를 사용가능하니 LIMIT 명령어를 사용해주세요.

-   사용 가능 명령어

```sql
SELECT * FROM student
LIMIT 3;
```

```sql
SELECT * FROM student
ORDER BY 마일리지 DESC
LIMIT 10;
```

-   사용 불가능 명령어

```sql
SELECT TOP 3 * FROM student;
```

```sql
SELECT TOP 10 PERCENT * FROM student;
```

## 2.20 CRUD 한 번에 사용해보기

CRUD란 대부분의 컴퓨터 소프트웨어가 가지는 기본적인 데이터 처리 기능인 **Create(생성)**, **Read(읽기)**, **Update(갱신)**, **Delete(삭제)**를 뜻하는 용어입니다.

### Create (생성)

CREATE 문을 사용하여 테이블을 새로 생성할 수 있습니다. 기본 구문은 다음과 같습니다.

```sql
CREATE TABLE [테이블명](
[컬럼명] [데이터타입] [조건]
[컬럼명] [데이터타입] [조건]
...
[컬럼명] [데이터타입] [조건]);
```

-   데이터 타입

| 데이터 타입 | 의미                                             |
| ----------- | ------------------------------------------------ |
| CHAR        | 특정 문자열 개수를 지정 (5자리 문자열 -> CHAR(5) |
| VARCHAR     | 가변 길이의 문자열                               |
| NUMBER      | 숫자에 사용되는 데이터 타입 (MYSQL은 INT 사용)   |
| DEMICAL     | 숫자에 사용되는 데이터 타입                      |
| DATE        | 날짜에 사용되는 데이터 타입                      |

-   조건

| 제약조건    | 의미                                                                            |
| ----------- | ------------------------------------------------------------------------------- |
| NOT NULL    | 값이 꼭 입력되어야 할 때 사용                                                   |
| UNIQUE      | 해당 컬럼에 중복된 값을 허용하지 않고자 할 때 사용                              |
| PRIMARY KEY | 해당 컬럼을 기본키로 지정할 때 사용                                             |
| FOREIGN KEY | 해당 컬럼을 외래키로 지정할 때 사용                                             |
| CHECK       | 컬럼에 입력되는 데이터를 체크해 특정 조건에 맞는 데이터만 입력받고자 할 때 사용 |
| DEFAULT     | 값이 입력되지 않으면 기본값으로 지정한 값으로 입력됨                            |
| INDEX       | 인덱스를 지정할 때 사용                                                         |

```sql
CREATE TABLE 제품 (
제품번호 INT PRIMARY KEY,
제품이름 VARCHAR NOT NULL,
가격 INT DEFAULT 0);
```

```sql
INSERT INTO 제품 (제품번호, 제품이름, 가격)
VALUES (1, '버그잡는 개리씨 키링', 12500);
```

```sql
INSERT INTO 제품 (제품번호, 제품이름, 가격)
VALUES (2, '딥러닝 개발자 무릎 담요', 17500);
```

```sql
INSERT INTO 제품 (제품번호, 제품이름, 가격)
VALUES (3, '개발자 노트북 파우치', 36000);
```

### Read (읽기)

```sql
SELECT * FROM 제품;
```

### Update (갱신)

```sql
UPDATE 제품
SET 제품이름='위니브 스티커 팩', 가격=3500
WHERE 제품번호 = 1;
--SELECT * FROM 제품;
```

### Delete (삭제)

-   레코드 삭제

```sql
DELETE FROM 제품 WHERE 제품번호=1;
```

-   테이블 삭제

```sql
DROP TABLE 제품;
```

## 2.21 SHOW, DESC

SHOW 명령어와 DESC 명령어는 모두 SQooL에서는 동작하지 않는 명령어입니다.
실습은 안하지만 콘솔에서 자주 쓰는 명령어입니다.

-   **SHOW**
    데이터 베이스나 테이블의 목록을 출력하는 명령어입니다.

```sql
mysql> SHOW databases;
```

```sql
mysql> SHOW tables;
    +-----------------+
    | Tables_in_sqool |
    +-----------------+
    | grade           |
    | invalid_data    |
    | major           |
    | mileage         |
    | professor       |
    | scholarship     |
    | student         |
    | subject         |
    | tuition         |
    +-----------------+
```

-   **DESC**
    DESCRIBE의 약자로 테이블의 구조를 조회하는 명령어입니다.

```sql
mysql> DESC table_name;
```

```sql
mysql> DESC student;
    +--------------+------+------+-----+---------+-------+
    | Field        | Type | Null | Key | Default | Extra |
    +--------------+------+------+-----+---------+-------+
    | 학번         | int  | YES  |     | NULL    |       |
    | 이름         | text | YES  |     | NULL    |       |
    | 학과         | text | YES  |     | NULL    |       |
    | 지도교수     | text | YES  |     | NULL    |       |
    | 학년         | int  | YES  |     | NULL    |       |
    | 생년월일     | text | YES  |     | NULL    |       |
    | 연락처       | text | YES  |     | NULL    |       |
    | 주소         | text | YES  |     | NULL    |       |
    | 마일리지     | int  | YES  |     | NULL    |       |
    +--------------+------+------+-----+---------+-------+
```

# 3. SQL 함수

-   미리 정의된 기능의 모음입니다.
-   함수의 종류에는 데이터베이스에 저장된 자료 한 줄 한 줄을 대상으로 하는 단일 행 함수와, 테이블 전체 행을 대상으로 하는 그룹 함수, 즉 복수 행 함수가 있습니다.
-   본 사이트의 Try it 섹션은 SQLite 기반으로 만들어진 codemirror 라이브러리로 만들어져 있습니다.  
    따라서 SQLite에서 지원하지 않는 함수라면 Try it 섹션에서도 작동하지 않을 수 있으며, SQLite 버전에 따라서도 달라질 수 있습니다.  
    버전은 `SELECT SQLITE_VERSION()` 구문으로 확인 가능합니다.
-   본 튜토리얼에서는 SQLite를 기준으로 문자 자료형을 처리하는 문자열 함수, 숫자 자료형을 처리하는 수학 함수를 소개합니다.

### 문자열 함수

SQLite에서는 `CONCAT`, `INITCAP`, `INSTR` 는 동작하지 않습니다.

-   날짜 및 시간 함수 → DATE(), TIME(), DATETIME(), STRFTIME()
-   CONCAT('abc', 'def') → 'abcdef' : 문자열 연결
-   LOWER('ABC') → 'abc'
-   UPPER('abc') → 'ABC'
-   INITCAP('abc') → 'Abc' : 문자열 중 가장 앞글자만 대문자
-   INSTR('ABCDEF', 'B') → 2 : 대소문자를 구분하여 문자열의 위치를 구함 (`INDEX` 는 1부터 시작합니다.)
-   SUBSTR('hello world', 1, 5) → 'hello' : 원하는 문자를 잘라내어 추출하거나, 문자열의 일부가 필요한 경우 사용
-   REPLACE('hello world', 'world', 'SQL') → 'hello SQL' : 바꾸고 싶은 값으로 대상 값을 교체
-   LENGTH('hello') → 5 : 문자열의 길이를 출력
-   COUNT : 전체 컬럼, 혹은 특정 컬럼의 행의 개수를 출력

### 수학 함수

SQLite에서는 `TRUNC`, `MOD`, `POWER`, `SQRT` 는 동작하지 않습니다.

-   ROUND(반올림할 숫자, 자릿수) : 숫자를 반올림하여 출력, 0이 소숫점 첫째자리
-   TRUNC(절삭할 숫자, 자릿수) : 숫자를 절삭하여 출력, 0이 소숫점 첫째자리
-   MOD(피제수, 제수) : 피제수를 제수로 나눈 나머지를 출력
-   POWER(밑, 지수) : 밑을 지수만큼 제곱한 값을 출력
-   SQRT(수) : 인자로 넣은 수의 제곱근 출력
-   통계 함수 : MAX(), MIN(), SUM(), AVG()

## 3.1 문자열 함수

### 날짜 및 시간 함수

SQLite에서는 `TEXT`, `REAL`, `INTEGER` 3가지 자료형으로 날짜 및 시간을 표기할 수 있습니다.  
날짜 및 시간 함수는 다양한 `한정자`(Modifiers)를 지정하여 사용자가 원하는 대로 데이터를 변화시킬 수 있습니다.  
<br/>

-   현재 날짜를 나타냅니다.

```sql
SELECT DATE();
```

<br/>
- 사용자의 현재 시간을 나타냅니다.

```sql
SELECT TIME();
```

<br/>
- 현재의 날짜와 시간을 한꺼번에 나타냅니다.

```sql
SELECT DATETIME();
```

<br/>
- (날짜 및 시간 함수 등)DATE, TIME 값을 포맷에 맞춰서 반환합니다.

```sql
-- strftime : 포맷 지정 (format, timestring, modifier)
-- DATE, TIME 값을 포맷에 맞추어 반환합니다.
SELECT STAFTIME('%Y-%m-%d %H:%M:%S', 'now');
SELECT STAFTIME('%Y#%m#%d %H@%M@%S', 'now');
```

<br/>
- 한정자 활용하기

```sql
-- 현지시간 기준으로 현재 달의 마지막 날짜
SELECT DATE('now', 'start of month', '+1 month', '-1 day', 'localtime');
```

<br/>
### CONCAT
- 문자열 또는 컬럼을 연결합니다. SQLite에서는 연결 연산자인 `||` 로 연결합니다.

```SQL
SELECT 학번 || 이름 || 학과 FROM student;
```

### LOWER, UPPER

-   모든 대문자를 소문자로, 모든 소문자를 대문자로 치환합니다.

```SQL
SELECT LOWER(교원번호) AS 교원번호 FROM professor; -- LOWER: 소문자로 바꾸기
```

```sql
SELECT UPPER(이메일) AS 이메일 FROM professor; -- UPPER: 대문자로 바꾸기
```

### SUBSTR

-   원하는 문자를 잘라내어 추출하거나, 문자열의 일부가 필요한 경우 사용합니다.

```sql
-- SUBSTR(STRING, START, LENGTH)
SELECT SUBSTR(주소, 1, 2) AS 주소 FROM student;
```

### REPLACE

-   바꾸고 싶은 값으로 대상 값을 교체합니다.

```sql
-- REPLACE(string,find_string,replacement)
SELECT REPLACE('Hello world', 'world', 'SQL');
```

### LENGTH

-   문자열의 길이를 출력합니다.

```sql
SELECT 이름, LENGTH(이름) AS 이름길이 FROM student;
```

### COUNT

-   전체 컬럼, 혹은 특정 컬럼의 행의 개수를 출력합니다.

```sql
SELECT COUNT(이름) FROM student;
```

## 3.2 수학 함수

### ROUND

-   숫자를 반올림하여 지정한 자릿수만큼 표시합니다.

```sql
SELECT ROUND(1학년1학기, 1) AS 반올림성적 FROM grade;
```

### MOD

-   피제수를 제수로 나눈 나머지를 출력합니다.

```sql
SELECT MOD(12, 5);
SELECT 12 % 5;
```

### 통계 함수

-   컬럼의 최댓값, 최솟값, 합계, 평균을 출력하는 함수입니다.

```sql
-- 최댓값 구하기
SELECT 학번, MAX(일학년일학기) AS '1학년 1등' FROM grade;
```

```sql
-- 최솟값 구하기
SELECT MIN(성적장학금) AS '성적장학금 최소 수령액' FROM scholarship;
```

```sql
-- 숫자 컬럼에 대하여 합계 내기
SELECT SUM(성적장학금) AS '성적장학금 총액' FROM scholarship;
```

```sql
-- 평균값 구하기
SELECT AVG(1학년1학기) AS '평균 성적' FROM grade;
```

## 3.3 연습문제

### 문자열 함수

1. 이름 컬럼의 문자열 길이를 출력하세요.
2. 이름 컬럼의 문자열에서 성을 제외하고 이름만 출력하세요.
3. 이름 컬럼의 문자열 뒤 2자리를 \*로 처리하세요.

### 수학 함수

1. 전체 학생들의 학년 평균을 구하세요.

```sql
-- 문자열 함수 모범답안
SELECT 교원번호, 이름,
    LENGTH(이름) AS 이름길이,
    SUBSTR(이름, 2, 3) AS 자른이름,
    REPLACE(이름, SUBSTR(이름, 2, 3), '**') AS 별표채운이름
FROM professor;
```

```sql
-- 수학 함수 모범답안
SELECT AVG(학년) FROM student;
```

# 4. 조건

## 4.1 조건문

- Oracle의 경우에는 `DECODE`, `CASE WHEN`
- MsSQL의 경우에는 `CASE WHEN`
- MySQL의 경우에는 `IF`, `CASE WHEN`
- SQLite의 경우에는 `CASE WHEN`

### CASE WHEN

조건에 맞는 데이터를 가져오고 싶을 때 사용하는 구문

- 기본 형태

```sql
SELECT [컬럼명]
CASE
    WHEN [조건1] THEN [결과1]
    WHEN [조건2] THEN [결과2]
    ELSE [결과3]
END [결과를 타나낼 컬럼명]
FROM [테이블명]
```

- 예제

```sql
SELECT 학과번호, 과목명, 이수구분,
CASE
    WHEN 이수구분 = '전필' THEN '전공 필수과목'
END AS '전공 필수 및 선택 구분'
FROM SUBJECT;
```

```sql
SELECT 학과번호, 과목명, 이수구분,
CASE
    WHEN 이수구분 = '전필' THEN '전공 필수과목'
    ELSE '전공 선택과목'
END AS '전공 필수 및 선택 구분'
FROM SUBJECT;
```

좀 더 어려운 구문을 해보도록 하겠습니다. 아래 구문을 실행해보세요.

```sql
SELECT 학번, 1학년2학기,
CASE
    WHEN 1학년2학기 = 4.5 THEN '신'
    WHEN 1학년2학기 BETWEEN 4.0 AND 4.49 THEN '교수님의 사랑'
    WHEN 1학년2학기 BETWEEN 3.5 AND 3.99 THEN '교수님의 귀염둥이'
    WHEN 1학년2학기 BETWEEN 3.0 AND 3.49 THEN '일반인'
    ELSE '오락문화의 선구자'
END AS '학점별 분류'
FROM GRADE;
```

```sql
SELECT 이름, 학년, 주소,
CASE
    WHEN SUBSTR(주소, 1, 2)='서울' THEN '서울 거주'
    WHEN SUBSTR(주소, 1, 2)='경기' THEN '경기 거주'
    WHEN SUBSTR(주소, 1, 2)='제주' THEN '제주 거주'
    ELSE '그 외 지역'
END AS '거주지역'
FROM student;
```

## 4.2 JOIN

JOIN은 관계형 데이터베이스 시스템상에서 기준을 가지고 데이터를 합치는 것을 뜻합니다.
데이터를 조합하는 방식인 JOIN에는 JOIN에는 INNER JOIN, LEFT JOIN, RIGHT JOIN, OUTER JOIN등이 존재합니다.

- [JOIN 실습사이트](https://sql-joins.leopard.in.ua/)

### INNER JOIN

- 기본 형태

```sql
SELECT [컬럼명1], [컬럼명2], ...
FROM [테이블명1]
INNER JOIN [테이블명2] ON [JOIN 조건]
```

- 예제

```sql
SELECT *
FROM student
INNER JOIN major ON student.학과 = major.학과이름;
```

```sql
SELECT
    student.이름,
    student.학과,
    student.지도교수,
    professor.연구실
FROM student
JOIN professor ON student.학과 = professor.학과;
```

```sql
SELECT
    student.학번,
    student.이름 AS 학생이름,
    professor.이름 AS 교수이름,
    professor.이메일 AS 교수이메일,
    scholarship.국가장학금
FROM student
INNER JOIN professor ON student.지도교수 = professor.이름
INNER JOIN scholarship ON student.학번 = scholarship.학번;
```



### LEFT OUTER JOIN

일치하는 항목이 있는 경우 왼쪽 테이블의 해당 내용을 출력합니다.

- 기본 형태

```sql
SELECT [컬럼명]
FROM [테이블명1]
LEFT OUTER JOIN [테이블명2] ON [조인 조건]
```


### RIGHT OUTER JOIN

일치하는 항목이 있는 경우 오른쪽 테이블의 해당 내용을 출력합니다.

- 기본 형태

```sql
SELECT [컬럼명]
FROM [테이블명1]
RIGHT OUTER JOIN [테이블명2] ON [조인 조건]
```


### FULL OUTER JOIN

왼쪽 테이블 또는 오른쪽 테이블에 일치하는 항목이 있을 경우 해당 내용 모두를 출력합니다.

- 기본 형태

```sql
SELECT [컬럼명]
FROM [테이블명1]
FULL OUTER JOIN [테이블명2] ON [조인 조건]
```

![출처 : 위니브](../JOINS.png)


## 4.3 UNION

데이터를 결합합니다.

- 기본 형태

```sql
SELECT [컬럼명]
FROM [테이블명]
UNION
SELECT [컬럼명]
FROM [테이블명]
```


- 예제

```sql
SELECT 이름
FROM student
UNION
SELECT 이름
FROM professor;
```

### UNION ALL

데이터 결합시 중복을 허용

```sql
SELECT 학과
FROM student
UNION ALL
SELECT 학과
FROM professor;
```



## 4.4 GROUP BY

특정 열을 기준으로 그룹화 하여 다른 특정 열에 붙일 때 사용합니다. 아래 코드에서 GROUP BY 코드를 삭제하면 작동하지 않습니다. 그 이유는 SELECT 절에서 이미 그룹 함수와 기준열이 쓰였기 때문입니다.

```sql
SELECT 학년, COUNT(학년) AS "학년별 학생 수"
FROM Student
GROUP BY 학년
```

```sql
SELECT 학년, AVG(마일리지) AS "학년별 마일리지 평균"
FROM student
GROUP BY 학년;
```

## 4.5 HAVING

그룹화된 데이터에 조건을 부여합니다.

```sql
SELECT 학년, COUNT(학년) AS "학년별 학생 수"
FROM Student
GROUP BY 학년
HAVING "학년별 학생 수" < 25
```

```sql
SELECT 학과, AVG(마일리지)
FROM student
GROUP BY 학과
HAVING 학년 > 2;
```

## 4.6 EXIST

서브 쿼리가 참일 경우 참을, 거짓일 경우 거짓을 반환합니다.

```sql
SELECT 이름
FROM student
WHERE EXISTS (SELECT 학번 FROM scholarship WHERE student.학번 = scholarship.학번 AND 학년 < 3);
```

## 4.7 ALL, ANY

SQooL에서는 돌아가지 않는 코드입니다. `ALL`은서브 쿼리가 모두 참이어야 참을 반환합니다. `ANY` 서브 쿼리가 하나라도 참이라면 참을 반환합니다. 대체 가능한 문법도 함께 명시합니다.

```sql
SELECT 이름
FROM student
WHERE 학번 IN (SELECT 학번 FROM grade WHERE 1학년1학기 > 4);
```

```sql
SELECT 학번, 이름
FROM student
WHERE 학번 = ANY(SELECT 학번 FROM grade WHERE 1학년1학기 > 4);
```

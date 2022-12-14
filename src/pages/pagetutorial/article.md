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
- DB → DBMS
- RDB → RDBMS

RDBMS(stands for Relational Database Management System)는 DB를 관리하는 시스템입니다. TOP3 오픈소스 RDBMS는 MySQL, PostgreSQL, SQLite입니다. 오픈소스가 아닌 것에서는 Oracle이 독보적입니다. 

## 1.4 관계형 데이터베이스 구성 요소
이번 챕터부터는 `2. 기본 구문 실습`을 먼저 해보고 보시기를 권해드립니다.

- TABLE(행, 열), VIEW(데이터를 선택하여 만든 가상의 부분 집합), INDEX(주소), SEQUENCE(시퀀스, 고유번호 자동생성), SYNONYM(시노임, 객체의 별칭) 등의 객체로 구성
- ENTITY, RELATIONE들의 집합

![출처 : 제주코딩베이스캠프 SQL 강좌](../Untitled.png)

- 튜플(Tuple)은 테이블의 행입니다.
- 속성(Attribute)은 HTML로 따지자면 Table Heading 입니다. 여기서는 학번, 이름, 주소, 전화번호가 속성이죠.
- 도메인(Domain)은 하나의 속성에서 취할 수 있는 값의 범위를 말합니다. 예를 들어 위에서는 신청 과목에서 전체 과목의 범위를 얘기합니다.
- 차수(Degree)는 속성의 개수입니다. 학생 릴레이션에서는 학번, 이름, 주소, 전화번호이니 총 4개가 될 것입니다.
- 기수(Cardinality)는 튜플의 개수입니다. 위에서는 어트리뷰트를 제외하고 총 5개의 튜플이 존재합니다.

### 1.4.1 키의 개념 및 종류
- 기본키는 메인으로 사용할 키를 말합니다. 고유한(유일한) 주민등록번호나, 계좌번호, 전화번호 등을 기본키로 사용할 수 있습니다. 기본키는 NULL을 사용할 수 없습니다.
- 후보키는 기본키를 제외하고 고유한 키들을 말합니다.
- 외래키는 관계되어 있는 테이블에서 참고하고 있는 키를 얘기합니다. 여기서 학생 릴레이션과 수강신청 과목 릴레이션은 서로 학번으로 연결되어 있죠.

### 1.4.2 데이터베이스의 종류
- 계층형 데이터베이스(1:N)
- 망형 데이터베이스(N:M)
- 관계형 데이터베이스(단순한 표 형태의 상호 관계, 1:1, 1:N, N:M관계 표현)
- 객체 지향형 데이터베이스

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

- 사전에 데이터 분석 기획을 합니다.
- 1번에서 3번까지의 단계가 전체 과정에 70% ~ 80%를 차지하고 있습니다.
- 기업에 모든 데이터를 누구나 조회 가능하도록 BigQuery같은 곳에 모아두기도 합니다. 이러한 시스템이 갖춰진 회사라면 누구나 간단한 조회가 가능한 SQL 구문을 습득하실 필요가 있습니다.
- 기업에 들어가도 데이터가 없거나 쓸 수 없는 경우도 있습니다. 또는 의미없는 데이터이거나 추가 데이터가 필요할 수도 있습니다. 이 경우에는 공공데이터 포털이나 다른 기관의 데이터를 참고하여 데이터를 만들어야 합니다.
- 데이터 수집부터, 가공하는 것까지 SQL을 사용할 수 있습니다. 물론 분석에도 쓸 수 있지만 분석에는 더 좋은 도구들이 많죠. R, Python 등의 언어가 있고, Tableau와 같은 시각화 솔루션이 있습니다.

## 1.8 정형 데이터와 비정형 데이터
![출처 : 제주코딩베이스캠프 SQL 강좌](../Untitled%201.png)

- 정형데이터는 RDBMS에서 사용하는 테이블 안에 들어가 있는 형식이 잡혀 있는 데이터를 말합니다.
- 비정형 데이터(unstructured data, unstructured information, 비정형 정보), 비구조화 데이터, 비구조적 데이터는 미리 정의된 데이터 모델이 없거나 미리 정의된 방식으로 정리되지 않은 정보를 말한다.(출처 : WIKI)

## 1.9 CRUD란?
- 데이터베이스에서 자주 등장하는 용어이니 기억해주세요. 생성과 읽기, 갱신과 삭제를 묶어 일컫는 말입니다.

[CRUD](https://ko.wikipedia.org/wiki/CRUD)

- Create
- Read
- Update
- Delete

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

- 오름차순 : ASC(기본, 작은 수에서 큰 수로, Ascending)
- 내림차순 : DESC(큰 수에서 작은 수로, Descending)

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
SELECT (학번 / 3) + 5 FROM student;
```

```sql
SELECT (학번 / 3) % 2 FROM student;
```

각각 컬럼끼리 연산도 가능합니다.

```sql
SELECT 학번 + 학번 FROM student;
```

해당 값은 0, 나누기를 하면 null로 반환합니다. 이어붙이려면 아래 있는 연결 연산자를 사용해야 합니다.

```sql
SELECT CustomerName + CustomerName FROM CustomersSELECT 학년 || ' ' || 학과 || ' ' || 학년 AS Student_Info FROM student
```

```sql
SELECT ProductName AS 제품이름, Price AS 기존가, Price*0.2 AS 할인된가격, Price*0.8 AS 최종가 
FROM Products
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
- LIKE '비교문자'

1. 비교 문자와 형태가 일치(%(모든 문자), _(한 글자) 사용)
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


- 자주 쓰는 예제
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
- NULL 값을 갖는 값(0은 값이 있는 것입니다.)

```sql
SELECT 학번, 성적장학금, 근로장학금, 국가장학금
FROM scholarship
WHERE 성적장학금 IS NULL
```

## 2.13 bit 단위 논리연산자
차례대로 AND, OR, XOR입니다.

```sql
SELECT 1 & 0;
```

```sql
SELECT 1 | 0;
```

```sql
SELECT 1 ^ 0;
```

## 2.14 WHERE
- 조회하려는 데이터에 조건 부여
- 여러 연산자를 결합하여 사용 가능
- 결합 가능한 연산자의 종류 : 비교연산자(=, <, >, !=, >=, <=), SQL연산자(BETWEEN), 논리 연산자(AND, OR) 등

```sql
SELECT 학년, 이름, 연락처
FROM student
WHERE 학년 >= 3;
```

```sql
SELECT 학번, 성적장학금, 근로장학금, 국가장학금
FROM scholarship
WHERE (성적장학금 IS NOT NULL) AND (근로장학금 IS NOT NULL) AND (국가장학금 IS NOT NULL)
```

```sql
SELECT 학번, 성적장학금, 근로장학금, 국가장학금
FROM scholarship
WHERE 국가장학금 > 100000
```

```sql
SELECT 교원번호, 이름, 학과, 연구실
FROM professor
WHERE 교원번호 IN ('A001', 'A002', 'A003')
```

## 2.15 INSERT
아래 코드를 사용한 후 다시 한 번 전체 컬럼을 조회해보세요. 나머지 값은 `null`로 들어가게 됩니다. 클릭을 3번 하면 3개의 데이터가 들어가게 됩니다.

```sql
INSERT INTO professor (이름, 학과, 이메일)
VALUES ('김물리', '물리학과', 'asdf123@sqool.ac.kr');
```

```sql
SELECT * FROM professor;
```

## 2.16 연습문제

### 문제  1번
4학년이면서, 주소에 울릉도에 살고 있는 학생을 구해주세요. 기본 데이터에 해당 데이터가 없다면, 위에 코드(INSERT)를 실행시켜 풀어주세요.

```sql
SELECT * FROM student 
WHERE 학년=4 AND 주소 LIKE '%울릉군%';
```

### 문제 2번
2학년1학기 성적이 null 값인 학생을 구해주세요.

```sql
/* SELECT * FROM student WHERE 2학년1학기=''; */
SELECT * FROM student WHERE 2학년1학기 IS NULL;
```

비어있는 문자열과 NULL값은 다른 값입니다.


## 2.17 Null Values 찾아내기
위 실습에서 일부러 몇 개의 값을 입력하지 않고 null값을 찾아보세요. 위에서 데이터를 삽입한 것 중 명시하지 않은 것들은 null 값으로 들어갔기 때문에 ContactName에 조회가 가능합니다.

```sql
SELECT *
FROM scholarship
WHERE 성적장학금 IS NULL;
```

is not 구문도 가능하답니다.

```sql
SELECT *
FROM scholarship
WHERE 성적장학금 IS NOT NULL;
```

## 2.18 UPDATE
값을 바꿉니다. 이 행위는 되돌릴 수 없습니다. where로 여러개를 select하여 바꿀 수 있습니다.

```sql
UPDATE student
SET 이름='이호준', 학과='컴퓨터공학과'
WHERE 학번=201900001;
```

```sql
SELECT * FROM student;
```

## 2.19 DELETE
주의하세요. WHERE 안적으면 다 삭제 됩니다. 이런일이 실무에서도 종종 발생됩니다.

```sql
DELETE FROM student WHERE 이름='이호준';
```

```sql
SELECT * FROM student;
```

## 2.20 TOP과 LIMIT
최 상단 3개의 행(row)을 보는 방법입니다. TOP 명령어는 SQooL에서 작동되진 않습니다. LIMIT 명령어는 사용가능하니 LIMIT 명령어를 사용해주세요.

- 사용 가능 명령어

```sql
SELECT * FROM student
LIMIT 3;
```

- 사용 불가능 명령어

```sql
SELECT TOP 3 * FROM student;
```

```sql
SELECT TOP 10 PERCENT * FROM student;
```


## 2.21 CRUD 한 번에 사용해보기
- CREATE, INSERT, UPDATE, DELETE, DROP
- 테이블을 생성하고(CREATE), 데이터를 삽입하고(INSERT), 업데이트하고(UPDATE), 삭제하고(DELETE), 테이블을 삭제(DROP)하는 명령sql어입니다. 순서대로 해보면서 `SELECT * FROM 제품`명령어를 사용하여 테이블이 어떻게 바뀌는지 확인해보세요.

```sql
CREATE TABLE 제품 (
제품번호 INT PRIMARY KEY,
제품이름 VARCHAR NOT NULL,
가격 INT DEFAULT 0);
```

```sql
INSERT INTO 제품 (제품번호, 제품이름, 가격)
VALUES (1, '버그잡는 개리씨 키링', 12500);
--SELECT * FROM 제품
```

```sql
UPDATE 제품
SET 제품이름='위니브 스티커 팩', 가격 = 3500
WHERE 제품번호 = 1;
--SELECT * FROM 제품
```

```sql
DELETE FROM 제품 WHERE 제품번호 = 1;
```

```sql
DROP TABLE 제품;
```

## 2.22 SHOW, DESC
SQooL에서 동작하지 않는 명령어입니다. 실습은 안하지만 콘솔에서 자주 쓰는 명령어입니다. 데이터베이스 목록을 출력하고 테이블을 이름순으로 출력하는 명령어입니다.

```sql
mysql> SHOW databases;
mysql> SHOW tables;
mysql> DESC table_name;
```

# 3. 함수
미리 정의된 기능 모음, 단일 행 함수와 그룹 함수가 있습니다. 모든 함수를 나열한 것은 아니지만, 전체적으로 어떤 기능들이 구현되어 있는지 보기에는 수월할 것입니다.

### 데이터 타입 함수
- 문자 : CHAR(값) : 문자 타입 지정 2000바이트
- 문자 : VARCHAR2(값) : 문자 타입 지정 4000바이트
- 숫자 : Oracle에서는 NUMBER(정수 자릿수, 소수 자릿수), MySQL은 INT사용
- 날짜 : DATE()
- 시간 : TIME()

### 문자열 처리
- CONCAT('abc', 'def') → 'abcdef' : 문자열 연결
- LOWER('ABC') → 'abc'
- UPPER('abc') → 'ABC'
- INITCAP('abc') → 'Abc' : 앞문자만 대문자
- SUBSTR('hello world', 1, 5) → 'hello' : 문자열을 자를 때 많이 사용합니다. 숫자는 시작위치, 자를 문자열의 길이를 나타냅니다.
- REPLACE('hello world', 'world', 'SQL') → 'hello SQL' : 바꾸고 싶은 값으로 대상 값을 교체합니다.
- LENGTH('hello') → 5 : 문자열의 길이를 출력합니다. COUNT와 비교해서 기억해주세요.
- COUNT : 행의 개수를 출력합니다.
- INSTR('ABCDEF', 'B') → 2 : 문자열의 위치를 구합니다. 여기서 INDEX는 1부터 시작합니다. 프로그래밍 언어는 0부터 시작하니, 이 차이를 꼭 기억해두세요.

### 수학함수
- ROUND(반올림할 숫자, 자릿수) : 숫자를 반올림, 0이 소숫점 첫째자리
- TRUNC(절삭할 숫자, 자릿수) : 숫자를 절삭, 0이 소숫점 첫째자리
- MOD(수, 나누는 값) : 나머지
- POWER(수, 승수) : 제곱 출력
- SQRT : 제곱근 출력

## 3.1 SQL 함수
대문자를 소문자로, 소문자를 대문자로 바꿀 수 있습니다.

```sql
SELECT LOWER(교원번호) AS 교원번호 FROM professor; -- LOWER: 소문자로 바꾸기 
SELECT UPPER(이메일) AS 이메일 FROM professor; -- UPPER: 대문자로 바꾸기
```

## 3.2 SUBSTR
`SUBSTR(컬럼, START, LENTH)`구조로 시작 주소부터 길이만큼 잘라내어 보여줍니다.
```sql
SELECT SUBSTR(주소,1,2) AS 주소 FROM student;
```

## 3.3 연습문제
1. 이름의 문자열의 길이를 출력해주세요.
2. 성을 제외하고 이름만 출력해주세요.
3. 이름의 뒤 2자리를 *로 처리해주세요.

```sql
SELECT 교원번호, 이름,
    LENGTH(이름) AS 이름길이,
    SUBSTR(이름, 2, 3) AS 자른이름,
    REPLACE(이름, SUBSTR(이름, 2, 3), '**') AS 별표채운이름
FROM professor;
```

여기서 사용한 SUBSTR 같은 경우

- Oracle은 SUBSTR, SUBSTRB
- MsSQL은 SUBSTRING
- MySQL은 SUBSTRING, SUBSTR, MID

을 사용합니다.

## 3.4 날짜
- DATE, TIME, DATETIME
- DIFF
- ADD, SUB

날짜와 시간이 어떻게 더해지는지 확인해보세요.

```sql
SELECT DATE();
-- SELECT DATE('now')와 같습니다.
-- SELECT STRFTIME('%Y-%m-%d', 'now');
```

```sql
SELECT DATE() + 10;
```

```sql
SELECT TIME();
-- SELECT TIME('now')와 같습니다.
-- SELECT STRFTIME('%H:%M:%f', 'now');
```

```sql
SELECT TIME() + 10;
```

```sql
SELECT DATETIME();
-- SELECT DATETIME('now')와 같습니다.
-- SELECT STRFTIME('%Y-%m-%d // %H:%M:%f', 'now')
```

```sql
SELECT DATETIME() + 10;
```

## 3.5 통계
통계관련된 함수를 실습해봅니다. 하나씩 사용해보세요. 보통은 분산과 표준편차 함수도 제공합니다. W3School에서는 분산과 표준편차가 작동하지 않습니다. 

```sql
SELECT 학번, MAX(일학년일학기) AS '1학년 1등' FROM grade;
SELECT MIN(성적장학금) AS '성적장학금 최소 수령액' FROM scholarship;
SELECT SUM(성적장학금) AS '성적장학금 총액' FROM scholarship;
SELECT COUNT(과목명) AS '과목 갯수' FROM subject;
SELECT AVG(1학년1학기) AS '평균 성적' FROM grade;
```

## 3.6 문자열 변환
해당 코드는 SQooL에서 작동하지 않아 실습은 안하지만 해당함수는 간혹 SQL Injection 공격에 사용되곤하니, 혹시 정보보안을 공부하는 학생이라면 기억해주시기 바랍니다.

```sql
SELECT CHAR(65) || CHAR(65));
SELECT CONCAT(CHAR(65), CHAR(65));
SELECT ASCII('A');
```

## 3.7 연습문제
```sql
SELECT * FROM student;
```

1. 전체 학생 수를 구해주세요.
```sql
SELECT COUNT(학번) FROM student;
```

2. 전체 학생들의 학년 평균을 구해주세요.(함수를 사용해주세요.)
```sql
SELECT AVG(학년) FROM student;
```

# 4. 조건

## 4.1 조건문
- Oracle의 경우에는 DECODE, CASE WHEN
- MsSQL의 경우에는 CASE WHEN
- MySQL의 경우에는 IF, CASE WHEN
- CASE WHEN 조건 THEN 참일경우_실행구문 ELSE 거짓일경우_실행구문 END

```sql
SELECT CASE WHEN '조건'='조건' THEN 'hello' ELSE 'world' END;
```

```sql
SELECT CASE WHEN '조건'!='조건' THEN 'hello' ELSE 'world' END;
```

좀 더 어려운 구문을 해보도록 하겠습니다. 아래 구문을 실행해보세요.

```sql
SELECT 이름, 학년,
CASE WHEN 학년 >= 3 THEN '3학년 이상' ELSE '3학년 미만' END AS 학년
FROM student;
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
기준을 가지고 데이터를 합칩니다. 여기서는 `INNER JOIN`만 사용해보도록 하겠습니다.

```sql
SELECT
student.학번,
student.이름 AS 학생이름,
professor.이름 AS 교수이름,
professor.이메일 AS 교수이메일
FROM student
INNER JOIN professor
--RIGHT JOIN professor
--LEFT JOIN professor
--FULL JOIN professor
ON student.지도교수 = professor.이름;
```

```sql
SELECT
student.학번,
student.이름 AS 학생이름,
professor.이름 AS 교수이름,
professor.이메일 AS 교수이메일,
scholarship.국가장학금
FROM student
INNER JOIN professor
ON student.지도교수 = professor.이름
INNER JOIN scholarship
ON student.학번=scholarship.학번;
```

![출처 : 위니브](../JOINS.png)

## 4.3 UNION
데이터를 결합합니다.

```sql
SELECT 학번, 이름 FROM student
UNION
SELECT 교원번호, 이름 FROM professor;
```

## 4.4 GROUP BY
특정 열을 기준으로 그룹화 하여 다른 특정 열에 붙일 때 사용합니다. 아래 코드에서 GROUP BY 코드를 삭제하면 작동하지 않습니다. 그 이유는 SELECT 절에서 이미 그룹 함수와 기준열이 쓰였기 때문입니다.

```sql
SELECT 학년, COUNT(학년) AS "학년별 학생 수" 
FROM Student
GROUP BY 학년
```

```sql
SELECT 학년, AVG(마일리지)
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